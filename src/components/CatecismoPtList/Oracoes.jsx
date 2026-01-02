
import React, { useEffect, useState } from "react";
import api from '../../api';

export default function Oracoes() {
  const [conteudo, setConteudo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/CatecismoPt/1')
      .then(res => {
        setConteudo(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Carregando oração...</div>;

  return (
    <div className="section">
      <h2>{conteudo.titulo}</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{conteudo.texto}</pre>
    </div>
  );
}
