
import React, { useEffect, useState } from 'react';
import './CatecismoUbList.css';

export default function CatecismoUbList() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/catecismoub')
      .then(res => res.json())
      .then(data => {
        setItens(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando catecismo (UB)...</div>;

  return (
    <div className="section">
      <h2>Catecismo Umbundu</h2>
      <ul>
        {itens.map(item => (
          <li key={item.id}>{item.pergunta}</li>
        ))}
      </ul>
    </div>
  );
}

    // The component has been removed as part of the cleanup process.
