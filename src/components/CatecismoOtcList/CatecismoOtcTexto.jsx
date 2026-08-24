
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams } from "react-router-dom";
import "./CatecismoOtcTopicos.css";

export default function CatecismoOtcTexto() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/CatecismoOtc/${id}`)
      .then(res => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Carregando texto...</div>;
  if (!item) return <div>Não encontrado.</div>;

  return (
    <div className="catecismo-otc-topicos-container">
      <h2>{item.titulo}</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{item.texto}</pre>
    </div>
  );
}
