
import React, { useEffect, useState } from 'react';
import api from '../../../api';
import CatecismoPtTopico from './CatecismoPtTopico';

export default function CatecismoPtTopicoList() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/catecismopttopicos')
      .then(res => {
        setTopicos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Carregando tópicos...</div>;

  return (
    <div className="section">
      {/* <h2>Tópicos do Catecismo Português</h2> */}
      <ul>
        {topicos.map(topico => (
          <li key={topico.id}>
            <CatecismoPtTopico topico={topico} />
          </li>
        ))}
      </ul>
    </div>
  );
}
