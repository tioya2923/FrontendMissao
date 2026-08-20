import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';
import { labelMetodoPagamento } from '../../constants/metodosPagamento';
import './Admin.css';

export default function AdminLojas() {
  const { nome, logout } = useAuth();
  const navigate = useNavigate();
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [comissaoEdit, setComissaoEdit] = useState({});

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data } = await api.get('/api/lojas/admin');
      setLojas(data);
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      setErro('Não foi possível carregar as lojas.');
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => { carregar(); }, [carregar]);

  const moderar = async (loja, alteracoes) => {
    const payload = { aprovada: loja.aprovada, ativa: loja.ativa, percentualComissao: loja.percentualComissao, ...alteracoes };
    try {
      await api.put(`/api/lojas/${loja.id}/moderar`, payload);
      setLojas((lista) => lista.map((l) => (l.id === loja.id ? { ...l, ...payload } : l)));
    } catch {
      alert('Não foi possível atualizar a loja.');
    }
  };

  const guardarComissao = async (loja) => {
    const valor = Number(comissaoEdit[loja.id]);
    if (Number.isNaN(valor) || valor < 0 || valor > 100) {
      alert('Indique uma percentagem entre 0 e 100.');
      return;
    }
    await moderar(loja, { percentualComissao: valor });
    setComissaoEdit((c) => { const novo = { ...c }; delete novo[loja.id]; return novo; });
  };

  const remover = async (loja) => {
    if (!window.confirm(`Eliminar a loja "${loja.nome}"? Só é possível se não tiver produtos.`)) return;
    try {
      await api.delete(`/api/lojas/${loja.id}`);
      await carregar();
    } catch (e) {
      alert(typeof e.response?.data === 'string' ? e.response.data : 'Não foi possível eliminar.');
    }
  };

  const sair = () => { logout(); navigate('/admin/login', { replace: true }); };

  return (
    <div className="admin-container admin-container-largo">
      <div className="admin-card">
        <div className="admin-header-row">
          <div>
            <Link to="/admin" className="admin-breadcrumb">← Administração</Link>
            <h1 className="admin-titulo">Lojas parceiras</h1>
            <p className="admin-subtitulo" style={{ margin: 0 }}>Marketplace{nome ? ` · ${nome}` : ''}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/admin/comissoes" className="admin-btn admin-btn-secundario">Ver comissões</Link>
            <button className="admin-btn admin-btn-secundario" onClick={sair}>Sair</button>
          </div>
        </div>

        {erro && <div className="admin-erro">{erro}</div>}

        {loading ? (
          <p className="admin-vazio">A carregar…</p>
        ) : lojas.length === 0 ? (
          <p className="admin-vazio">Ainda não há lojas registadas.</p>
        ) : (
          <div className="admin-lista">
            {lojas.map((l) => (
              <div className="admin-item" key={l.id}>
                <div className="admin-item-info">
                  <span className="admin-item-label">
                    {l.nome}
                    <span className="admin-item-badge" style={{
                      background: l.aprovada ? '#e8f5e9' : '#fff3e0',
                      color: l.aprovada ? '#2e7d32' : '#e65100',
                    }}>
                      {l.aprovada ? 'Aprovada' : 'Pendente'}
                    </span>
                    {!l.ativa && <span className="admin-item-badge">Pausada</span>}
                  </span>
                  <div className="admin-item-desc">{l.email}{l.telefone ? ` · ${l.telefone}` : ''}</div>
                  <div className="admin-item-desc">{l.morada}{l.categoria ? ` · ${l.categoria}` : ''}</div>
                  <div className="admin-item-desc" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span>Comissão:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      style={{ width: 70, padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc' }}
                      value={comissaoEdit[l.id] ?? l.percentualComissao}
                      onChange={(e) => setComissaoEdit((c) => ({ ...c, [l.id]: e.target.value }))}
                    />
                    <span>%</span>
                    {comissaoEdit[l.id] !== undefined && Number(comissaoEdit[l.id]) !== l.percentualComissao && (
                      <button className="admin-btn" style={{ padding: '4px 10px' }} onClick={() => guardarComissao(l)}>Guardar</button>
                    )}
                  </div>
                  <div className="admin-item-desc" style={{ marginTop: 4 }}>
                    Pagamento: {l.formasPagamento?.length > 0
                      ? l.formasPagamento.map((f) => labelMetodoPagamento(f.metodo)).join(', ')
                      : <em>nenhuma forma definida ainda</em>}
                  </div>
                </div>
                <div className="admin-item-acoes">
                  {!l.aprovada && (
                    <button className="admin-btn" onClick={() => moderar(l, { aprovada: true })}>Aprovar</button>
                  )}
                  {l.aprovada && (
                    <button className="admin-btn admin-btn-secundario" onClick={() => moderar(l, { ativa: !l.ativa })}>
                      {l.ativa ? 'Pausar' : 'Reativar'}
                    </button>
                  )}
                  <button className="admin-btn admin-btn-perigo" onClick={() => remover(l)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
