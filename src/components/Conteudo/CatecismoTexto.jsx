import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

// Uma pergunta/resposta ou oração do Catecismo, em qualquer idioma.
export default function CatecismoTexto() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading before re-fetching
    setLoading(true);
    api.get(`/api/catecismopt/${id}`)
      .then(res => { if (!ignore) { setItem(res.data); setLoading(false); } })
      .catch(() => { if (!ignore) { setItem(null); setLoading(false); } });
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <div className="loading">Carregando texto...</div>;
  if (!item) return <div className="vazio">Não encontrado.</div>;

  return (
    <div className="catecismo-topicos-container">
      <h2>{item.titulo}</h2>
      <pre className="letra">{item.texto}</pre>
    </div>
  );
}
