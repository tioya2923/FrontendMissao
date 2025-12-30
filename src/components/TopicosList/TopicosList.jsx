import React, { useEffect, useState } from 'react';
import './TopicosList.css';

export default function TopicosList() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/topicos')
      .then(res => res.json())
      .then(data => {
        setTopicos(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando tópicos...</div>;

  return (
    <div className="section">
      <h2>Tópicos</h2>
      <ul>
        {topicos.map(t => (
          <li key={t.id}>{t.nome}</li>
        ))}
      </ul>
    </div>
  );
}
