import React, { useEffect, useState } from 'react';
import CatecismoUbTopico from './CatecismoUbTopico';

export default function CatecismoUbTopicoList() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/catecismubttopicos')
      .then(res => res.json())
      .then(data => {
        setTopicos(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando tópicos...</div>;

  return (
    <div className="section">
      {/* <h2>Tópicos do Catecismo Umbundu</h2> */}
      <ul>
        {topicos.map(topico => (
          <li key={topico.id}>
            <CatecismoUbTopico topico={topico} />
          </li>
        ))}
      </ul>
    </div>
  );
}
