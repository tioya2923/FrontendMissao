

import React, { useEffect, useState, useRef } from "react";
import api from '../../api';
import { Link } from "react-router-dom";
import "./Noticias.css";


export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    api.get('/api/noticias')
      .then(res => {
        let arr = Array.isArray(res.data) ? res.data : [];
        arr = arr.sort((a, b) => {
          if (a.dataCriacao && b.dataCriacao) {
            return new Date(b.dataCriacao) - new Date(a.dataCriacao);
          }
          return b.id - a.id;
        });
        setNoticias(arr.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Auto-advance slide every 4s
  useEffect(() => {
    if (noticias.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setSlideIdx((idx) => (idx + 1) % noticias.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [noticias]);


  if (loading) return <div>Carregando notícias...</div>;
  if (error) return <div style={{ color: "red" }}>Erro: {error}</div>;

  return (
    <div className="section noticias-section">
      {noticias.length === 0 ? (
        <div style={{ color: "#888" }}>Nenhuma notícia cadastrada.</div>
      ) : (
        <div className="noticias-slider">
          {/* Botão esquerda */}
          <button
            className="noticias-slider-arrow left"
            onClick={() =>
              setSlideIdx((idx) => (idx - 1 + noticias.length) % noticias.length)
            }
          >
            ‹
          </button>

          {/* Slides */}
          {noticias.map((noticia, idx) => (
            <div
              className={`noticia-slide ${idx === slideIdx ? "active" : ""}`}
              key={noticia.id}
            >
              <Link to={`/noticias/${noticia.id}`} className="noticia-img-link">
                <div className="noticia-img-container">
                  <img
                    src={`http://localhost:5018${noticia.imagemUrl}`}
                    alt={noticia.titulo}
                    className="noticia-img"
                  />
                  <div className="noticia-img-gradient-overlay">
                    <h3 className="noticia-img-titulo">{noticia.titulo}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Botão direita */}
          <button
            className="noticias-slider-arrow right"
            onClick={() =>
              setSlideIdx((idx) => (idx + 1) % noticias.length)
            }
          >
            ›
          </button>

        
        </div>

      )}
    </div>

  );
}
