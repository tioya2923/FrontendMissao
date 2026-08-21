import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';
import { formatarPreco } from '../../constants/moeda';
import './Admin.css';

export default function AdminVendas() {
  const { nome, logout } = useAuth();
  const navigate = useNavigate();
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [aEnviarLembrete, setAEnviarLembrete] = useState(false);
  const [mensagemLembrete, setMensagemLembrete] = useState(null);

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
      setErro('Não foi possível carregar as vendas.');
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => { carregar(); }, [carregar]);

  const enviarLembreteAgora = async () => {
    if (!window.confirm('Enviar já, a todas as lojas aprovadas e ativas, o email a pedir apoio voluntário?')) return;
    setAEnviarLembrete(true);
    setMensagemLembrete(null);
    try {
      const { data } = await api.post('/api/lembretes/apoio/enviar-agora');
      setMensagemLembrete(`Enviado a ${data.enviados} loja${data.enviados !== 1 ? 's' : ''} (referente a ${data.referenteA}).`);
    } catch {
      setMensagemLembrete('Não foi possível enviar o lembrete.');
    } finally {
      setAEnviarLembrete(false);
    }
  };

  const sair = () => { logout(); navigate('/admin/login', { replace: true }); };

  return (
    <div className="admin-container admin-container-largo">
      <div className="admin-card">
        <div className="admin-header-row">
          <div>
            <Link to="/admin/lojas" className="admin-breadcrumb">← Lojas parceiras</Link>
            <h1 className="admin-titulo">Vendas das lojas</h1>
            <p className="admin-subtitulo" style={{ margin: 0 }}>Marketplace{nome ? ` · ${nome}` : ''}</p>
          </div>
          <button className="admin-btn admin-btn-secundario" onClick={sair}>Sair</button>
        </div>

        {erro && <div className="admin-erro">{erro}</div>}

        <div style={{
          background: '#eef4fc', color: '#1c4a7a', borderRadius: 10, padding: '16px 20px',
          marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Lembrete mensal de apoio</div>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#3a6390' }}>
              A Ndatava não cobra comissão — perto do fim de cada mês, envia-se automaticamente um
              email a todas as lojas a pedir uma doação voluntária. Pode disparar já, manualmente,
              para testar.
            </p>
          </div>
          <button className="admin-btn" onClick={enviarLembreteAgora} disabled={aEnviarLembrete} style={{ flexShrink: 0 }}>
            {aEnviarLembrete ? 'A enviar…' : 'Enviar agora'}
          </button>
        </div>
        {mensagemLembrete && <div className="admin-erro" style={{ background: '#e8f5e9', color: '#2e7d32', border: 'none' }}>{mensagemLembrete}</div>}

        {loading ? (
          <p className="admin-vazio">A carregar…</p>
        ) : !resumo || resumo.lojas.length === 0 ? (
          <p className="admin-vazio">Ainda não há encomendas registadas.</p>
        ) : (
          <>
            <div style={{
              background: '#e8f5e9', color: '#2e7d32', borderRadius: 10, padding: '18px 20px',
              marginBottom: 20,
            }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>Total vendido, por moeda</div>
              {/* As lojas podem vender em moedas diferentes — nunca se soma tudo junto */}
              {Object.entries(
                resumo.lojas.reduce((acc, l) => {
                  acc[l.moeda] = (acc[l.moeda] || 0) + Number(l.totalVendido);
                  return acc;
                }, {})
              ).map(([moeda, total]) => (
                <div key={moeda} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
                  <span>{moeda}</span><span>{formatarPreco(total, moeda)}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 16 }}>
              Os pagamentos são feitos diretamente entre o comprador e a loja — a app não processa
              dinheiro nem retém comissão. Estes números são só informativos. Não incluem encomendas
              canceladas.
            </p>

            <div className="admin-tabela-wrap">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Loja</th>
                    <th>Encomendas</th>
                    <th>Total vendido</th>
                  </tr>
                </thead>
                <tbody>
                  {resumo.lojas.map((l) => (
                    <tr key={l.lojaId}>
                      <td>{l.lojaNome}</td>
                      <td>{l.numeroEncomendas}</td>
                      <td style={{ fontWeight: 700 }}>{formatarPreco(l.totalVendido, l.moeda)}</td>
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
