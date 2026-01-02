
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams } from "react-router-dom";
import "./NoticiaDetalhe.css";

export default function NoticiaDetalhe() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/api/noticias/${id}`)
      .then(res => {
        setNoticia(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Carregando notícia...</div>;
  if (error) return <div style={{ color: "red" }}>Erro: {error}</div>;
  if (!noticia) return <div>Notícia não encontrada.</div>;

  return (
    <div className="noticia-detalhe-section">
      {noticia.imagemUrl && (
        <img
          src={`https://backendmissaohuambo.onrender.com${noticia.imagemUrl}`}
          alt={noticia.titulo}
          className="noticia-detalhe-img"
        />
      )}

      <div className="noticia-detalhe-titulo">{noticia.titulo}</div>
      <div className="noticia-detalhe-texto">{noticia.texto}</div>
    </div>
  );
}
