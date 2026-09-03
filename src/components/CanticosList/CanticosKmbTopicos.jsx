
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import "./CanticosKmbTopicos.css";

export default function CanticosKmbTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/topicos?idioma=kmb')
      .then(res => {
        setTopicos(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleTopicoClick = (topico) => {
    const slug = topico.slug || topico.Slug;
    const nome = slug
      ? encodeURIComponent(slug)
      : encodeURIComponent(
          (topico.titulo || topico.nome || topico)
            .toString()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()
        );
    navigate(`/canticos/kimbundu/topicos/${nome}`);
  };

  return (
    <div className="canticos-kmb-topicos-container">
      {loading && <div>Carregando...</div>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}

      {!loading && !error && topicos.length === 0 && (
        <div style={{ color: "#888" }}>Ainda não há cânticos disponíveis neste idioma.</div>
      )}

      <ul className="canticos-kmb-topicos-list">
        {(() => {
          const ordem = [
            "Procissão", "Entrada", "Kyrie", "Entronização da Palavra", "Aleluia",
            "Oração dos Fiéis", "Ofertório", "Elevação", "Santo", "Saudação",
            "Cordeiro de Deus", "Comunhão", "Acção de Graças", "Saída",
          ];
          const topicosFiltrados = topicos.filter(topico => {
            const nome = (topico.titulo || topico.nome || topico).toString().toLowerCase();
            return nome !== 'geral';
          });
          const topicosOrdenados = ordem
            .map(nomeOrdem => topicosFiltrados.find(topico => (topico.titulo || topico.nome || topico) === nomeOrdem))
            .filter(Boolean);
          const outros = topicosFiltrados.filter(topico => !ordem.includes(topico.titulo || topico.nome || topico));
          return [...topicosOrdenados, ...outros].map((topico, idx) => (
            <li
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => handleTopicoClick(topico)}
            >
              {topico.titulo || topico.nome ||
                (topico.slug || topico.Slug
                  ? (topico.slug || topico.Slug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                  : topico)
              }
            </li>
          ));
        })()}
      </ul>
    </div>
  );
}
