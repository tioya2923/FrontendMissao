import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';
import { getGrupos } from './resourcesConfig';
import './Admin.css';

export default function AdminHome() {
  const { nome, logout } = useAuth();
  const navigate = useNavigate();
  const [idiomas, setIdiomas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    api.get('/api/idiomas').then(r => setIdiomas(r.data)).catch(() => setIdiomas([]));
  }, []);

  const grupos = useMemo(() => getGrupos(idiomas), [idiomas]);

  const sair = () => { logout(); navigate('/admin/login', { replace: true }); };

  const gruposFiltrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    if (!termo) return grupos;
    return grupos
      .map(g => ({ ...g, itens: g.itens.filter(r => r.titulo.toLowerCase().includes(termo)) }))
      .filter(g => g.itens.length > 0);
  }, [grupos, pesquisa]);

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

        <div className="admin-search-wrap">
          <input
            type="text"
            className="admin-search"
            placeholder="Pesquisar (ex: cânticos, utilizadores, loja...)"
            value={pesquisa}
            onChange={e => setPesquisa(e.target.value)}
            autoFocus
          />
        </div>

        {gruposFiltrados.length === 0 ? (
          <p className="admin-search-vazio">Nenhum resultado para "{pesquisa}".</p>
        ) : (
          <div className="admin-grupos">
            {gruposFiltrados.map(g => (
              <div className="admin-grupo" key={g.nome}>
                <div className="admin-grupo-cabecalho">
                  <span className="admin-grupo-icone" aria-hidden="true">{g.nome.charAt(0)}</span>
                  <h2 className="admin-grupo-titulo">{g.nome}</h2>
                </div>
                <div className="admin-grupo-itens">
                  {g.itens.map(r => (
                    <Link key={r.key} to={r.rota || `/admin/${r.key}`} className="admin-grupo-link">
                      {r.titulo}
                      <span className="admin-item-acoes" style={{ color: '#6b6155' }}>›</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
