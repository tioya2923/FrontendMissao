import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NoticiaDetalhe.css";

export default function NoticiaDetalhe() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/noticias/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar notícia");
        return res.json();
      })
      .then((data) => {
        setNoticia(data);
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
          src={`http://localhost:5018${noticia.imagemUrl}`}
          alt={noticia.titulo}
          className="noticia-detalhe-img"
        />
      )}

      <div className="noticia-detalhe-titulo">{noticia.titulo}</div>
      <div className="noticia-detalhe-texto">{noticia.texto}</div>
    </div>
  );
}
