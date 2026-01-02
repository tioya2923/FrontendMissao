
import React, { useEffect, useState } from "react";
import api from '../../api';
import { Link, useNavigate } from "react-router-dom";
import "./CatecismoPtTopicos.css";

export default function CatecismoPtTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/catecismopttopicos/topicos')
      .then(res => {
        setTopicos(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleTopicoClick = (topico) => {
    const slug = topico.slug || topico.Slug;
    const nome = slug
      ? encodeURIComponent(slug)
      : encodeURIComponent(
          (topico.titulo || topico.nome || topico)
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()
        );
    navigate(`/catecismo/portugues/topicos/${nome}`);
  };

  if (loading) return <div className="loading">Carregando tópicos...</div>;

  return (
    <div className="section">
      {/* <h2>Tópicos do Catecismo</h2> */}
      {error && <div style={{color: 'red'}}>Erro: {error}</div>}
      <ul className="catecismo-pt-topicos-list">
        {topicos.map((topico, idx) => (
          <li key={idx}>
            <Link to={`/catecismo/portugues/topico/${topico.id}`} style={{cursor: 'pointer', color: '#1976d2', textDecoration: 'underline'}}>
              {topico.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
