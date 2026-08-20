import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { getGrupos } from './resourcesConfig';
import './Admin.css';

export default function AdminHome() {
  const { nome, logout } = useAuth();
  const navigate = useNavigate();
  const grupos = getGrupos();

  const sair = () => { logout(); navigate('/admin/login', { replace: true }); };

  return (
    <div className="admin-container admin-container-largo">
      <div className="admin-card">
        <div className="admin-header-row">
          <div>
            <h1 className="admin-titulo">Administração</h1>
            <p className="admin-subtitulo" style={{ margin: 0 }}>{nome ? `Sessão: ${nome}` : ''}</p>
          </div>
          <button className="admin-btn admin-btn-secundario" onClick={sair}>Sair</button>
        </div>

        <div className="admin-grupos">
          {grupos.map(g => (
            <div className="admin-grupo" key={g.nome}>
              <h2 className="admin-grupo-titulo">{g.nome}</h2>
              <div className="admin-grupo-itens">
                {g.itens.map(r => (
                  <Link key={r.key} to={r.rota || `/admin/${r.key}`} className="admin-grupo-link">
                    {r.titulo}
                    <span className="admin-item-acoes" style={{ color: '#999' }}>›</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
