
import React, { useEffect, useState } from "react";
import api from '../../api';
import { Link } from "react-router-dom";
import "./CatecismoUbTopicos.css";

export default function CatecismoUbTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/catecismopttopicos/topicos?idioma=umb')
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
      {error && <div style={{color: 'red'}}>Erro: {error}</div>}
      <ul>
        {topicos.map(topico => (
          <li key={topico.id}>
            <Link to={`/catecismo/umbundu/topico/${topico.id}`}>{topico.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
