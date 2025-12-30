import React, { useEffect, useState } from 'react';
import './CanticosList.css';

export default function CanticosList() {
  const [canticos, setCanticos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/canticos')
      .then(res => res.json())
      .then(data => {
        setCanticos(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando cânticos...</div>;

  return (
    <div className="section">
      <h2>Cânticos</h2>
      <ul>
        {canticos.map(c => (
          <li key={c.id}>{c.titulo}</li>
        ))}
      </ul>
    </div>
  );
}
