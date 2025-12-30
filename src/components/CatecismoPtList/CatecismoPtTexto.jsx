import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CatecismoPtTexto() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/catecismopt/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Carregando texto...</div>;
  if (!item) return <div>Não encontrado.</div>;

  return (
    <div className="section">
      <h2>{item.titulo}</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{item.texto}</pre>
    </div>
  );
}
