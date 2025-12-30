import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CatecismoUbTopicos.css";

export default function CatecismoUbTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/catecismoubtopicos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar tópicos');
        return res.json();
      })
      .then(data => {
        setTopicos(data);
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
