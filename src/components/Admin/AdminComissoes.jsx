import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';
import './Admin.css';

export default function AdminComissoes() {
  const { nome, logout } = useAuth();
  const navigate = useNavigate();
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data } = await api.get('/api/encomendas/comissoes');
      setResumo(data);
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      }
      setErro('Não foi possível carregar as comissões.');
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => { carregar(); }, [carregar]);

  const sair = () => { logout(); navigate('/admin/login', { replace: true }); };

  return (
    <div className="admin-container admin-container-largo">
      <div className="admin-card">
        <div className="admin-header-row">
          <div>
            <Link to="/admin/lojas" className="admin-breadcrumb">← Lojas parceiras</Link>
            <h1 className="admin-titulo">Comissões</h1>
            <p className="admin-subtitulo" style={{ margin: 0 }}>Marketplace{nome ? ` · ${nome}` : ''}</p>
          </div>
          <button className="admin-btn admin-btn-secundario" onClick={sair}>Sair</button>
        </div>

        {erro && <div className="admin-erro">{erro}</div>}

        {loading ? (
          <p className="admin-vazio">A carregar…</p>
        ) : !resumo || resumo.lojas.length === 0 ? (
          <p className="admin-vazio">Ainda não há encomendas para calcular comissões.</p>
        ) : (
          <>
            <div style={{
              background: '#e8f5e9', color: '#2e7d32', borderRadius: 10, padding: '18px 20px',
              marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total de comissão a receber (todas as lojas)</span>
              <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>{Number(resumo.totalGeralComissao).toFixed(2)} Kz</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 16 }}>
              Os pagamentos são feitos diretamente entre o comprador e a loja — a app não processa dinheiro.
              Estes valores servem de base para cobrar a comissão a cada loja periodicamente (ex.: transferência mensal).
              Não inclui encomendas canceladas.
            </p>

            <div className="admin-tabela-wrap">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Loja</th>
                    <th>Encomendas</th>
                    <th>Total vendido</th>
                    <th>Comissão a receber</th>
                  </tr>
                </thead>
                <tbody>
                  {resumo.lojas.map((l) => (
                    <tr key={l.lojaId}>
                      <td>{l.lojaNome}</td>
                      <td>{l.numeroEncomendas}</td>
                      <td>{Number(l.totalVendido).toFixed(2)} Kz</td>
                      <td style={{ fontWeight: 700, color: '#2e7d32' }}>{Number(l.totalComissao).toFixed(2)} Kz</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
