
import React, { useEffect, useState } from 'react';
import api from '../../api';
import './TopicosList.css';

export default function TopicosList() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/topicos')
      .then(res => {
        setTopicos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
