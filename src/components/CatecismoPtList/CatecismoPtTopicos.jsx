
import React, { useEffect, useState } from "react";
import api from '../../api';
import { Link } from "react-router-dom";
import "./CatecismoPtTopicos.css";

export default function CatecismoPtTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="loading">Carregando tópicos...</div>;

  return (
    <div className="section">
      {/* <h2>Tópicos do Catecismo</h2> */}
      {error && <div style={{color: 'red'}}>Erro: {error}</div>}
      <ul className="catecismo-pt-topicos-list">
        {topicos.map((topico, idx) => (
          <li key={idx}>
            <Link to={`/catecismo/portugues/topico/${topico.id}`} style={{cursor: 'pointer', color: '#7a1f2b', textDecoration: 'underline'}}>
              {topico.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
