import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';
import './Admin.css';

const ESTADOS = ['Pendente', 'Confirmada', 'Enviada', 'Cancelada'];

const CORES_ESTADO = {
  Pendente: '#b45309',
  Confirmada: '#1976d2',
  Enviada: '#2e7d32',
  Cancelada: '#b71c1c',
};

export default function AdminEncomendas() {
  const { nome, logout } = useAuth();
  const navigate = useNavigate();

  const [encomendas, setEncomendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [aGuardarId, setAGuardarId] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data } = await api.get('/api/encomendas');
      setEncomendas(data);
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      setErro('Não foi possível carregar as encomendas.');
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => { carregar(); }, [carregar]);

  const mudarEstado = async (encomenda, novoEstado) => {
    setAGuardarId(encomenda.id);
    try {
      await api.put(`/api/encomendas/${encomenda.id}/estado`, { estado: novoEstado });
      setEncomendas(lista => lista.map(e => e.id === encomenda.id ? { ...e, estado: novoEstado } : e));
    } catch {
      alert('Não foi possível atualizar o estado.');
    } finally {
      setAGuardarId(null);
    }
  };

  const remover = async (encomenda) => {
    if (!window.confirm(`Eliminar a encomenda #${encomenda.id} de ${encomenda.nomeCliente}?`)) return;
    try {
      await api.delete(`/api/encomendas/${encomenda.id}`);
      await carregar();
    } catch {
      alert('Não foi possível eliminar.');
    }
  };

  const sair = () => { logout(); navigate('/admin/login', { replace: true }); };

  return (
    <div className="admin-container admin-container-largo">
      <div className="admin-card">
        <div className="admin-header-row">
          <div>
            <Link to="/admin" className="admin-breadcrumb">← Administração</Link>
            <h1 className="admin-titulo">Encomendas</h1>
            <p className="admin-subtitulo" style={{ margin: 0 }}>Loja{nome ? ` · ${nome}` : ''}</p>
          </div>
          <button className="admin-btn admin-btn-secundario" onClick={sair}>Sair</button>
        </div>

        {erro && <div className="admin-erro">{erro}</div>}

        {loading ? (
          <p className="admin-vazio">A carregar…</p>
        ) : encomendas.length === 0 ? (
          <p className="admin-vazio">Ainda não existem encomendas.</p>
        ) : (
          <div className="admin-lista">
            {encomendas.map((enc) => (
              <div className="admin-item" key={enc.id} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div className="admin-item-info">
                    <span className="admin-item-label">
                      #{enc.id} — {enc.nomeCliente}
                      <span
                        className="admin-item-badge"
                        style={{ background: `${CORES_ESTADO[enc.estado]}20`, color: CORES_ESTADO[enc.estado] }}
                      >
                        {enc.estado}
                      </span>
                    </span>
                    <div className="admin-item-desc">
                      {enc.contacto}{enc.morada ? ` · ${enc.morada}` : ''}
                    </div>
                    <div className="admin-item-desc">
                      {new Date(enc.data).toLocaleString('pt-PT')}
                    </div>
                    {enc.observacoes && <div className="admin-item-desc">Obs.: {enc.observacoes}</div>}
                  </div>
                  <div className="admin-item-acoes">
                    <select
                      value={enc.estado}
                      disabled={aGuardarId === enc.id}
                      onChange={(e) => mudarEstado(enc, e.target.value)}
                      style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
                    >
                      {ESTADOS.map(estado => <option key={estado} value={estado}>{estado}</option>)}
                    </select>
                    <button className="admin-btn admin-btn-perigo" onClick={() => remover(enc)}>Eliminar</button>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 10 }}>
                  {enc.itens.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', padding: '3px 0' }}>
                      <span>{item.quantidade}× {item.produtoNome}</span>
                      <span>{(item.precoUnitario * item.quantidade).toFixed(2)} Kz</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: 6 }}>
                    <span>Total</span>
                    <span>{Number(enc.total).toFixed(2)} Kz</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
