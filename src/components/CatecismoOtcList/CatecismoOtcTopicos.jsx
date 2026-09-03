
import React, { useEffect, useState } from "react";
import api from '../../api';
import { Link } from "react-router-dom";
import "./CatecismoOtcTopicos.css";

export default function CatecismoOtcTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/catecismopttopicos/topicos?idioma=otc')
      .then(res => {
        setTopicos(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando tópicos...</div>;

  return (
    <div className="catecismo-otc-topicos-container">
      {error && <div style={{ color: 'red' }}>Erro: {error}</div>}
      <ul className="catecismo-otc-topicos-list">
        {topicos.map(topico => (
          <li key={topico.id}>
            <Link to={`/catecismo/otchikwama/topico/${topico.id}`}>{topico.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
