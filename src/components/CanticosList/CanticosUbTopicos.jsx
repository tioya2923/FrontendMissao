
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import "./CanticosUbTopicos.css";

export default function CanticosUbTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/topicos?idioma=umb')
      .then(res => {
        setTopicos(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Usa o slug se existir, senão normaliza o nome
  const handleTopicoClick = (topico) => {
    const slug = topico.slug || topico.Slug;
    const nome = slug
      ? encodeURIComponent(slug)
      : encodeURIComponent(
          (topico.titulo || topico.nome || topico)
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // remove acentos
            .replace(/\s+/g, '-') // espaços para hífen
            .toLowerCase()
        );
    navigate(`/canticos/umbundu/topicos/${nome}`);
  };

  return (
    <div className="canticos-ub-topicos-container">
      

      {loading && <div>Carregando...</div>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}

      <ul className="canticos-ub-topicos-list">
        {(() => {
          const ordem = [
            "Procissão",
            "Entrada",
            "Kyrie",
            "Entronização da Palavra",
            "Aleluia",
            "Oração dos Fiéis",
            "Ofertório",
            "Elevação",
            "Santo",
            "Saudação",
            "Cordeiro de Deus",
            "Comunhão",
            "Acção de Graças",
            "Saída"
          ];
          // Filtra e ordena conforme a ordem desejada
          const topicosFiltrados = topicos
            .filter(topico => {
              const nome = (topico.titulo || topico.nome || topico).toString().toLowerCase();
              return nome !== 'geral';
            });
          const topicosOrdenados = ordem
            .map(nomeOrdem => topicosFiltrados.find(topico => (topico.titulo || topico.nome || topico) === nomeOrdem))
            .filter(Boolean);
          // Adiciona os demais tópicos que não estão na ordem fixa
          const outros = topicosFiltrados.filter(topico => !ordem.includes(topico.titulo || topico.nome || topico));
          return [...topicosOrdenados, ...outros].map((topico, idx) => (
            <li
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => handleTopicoClick(topico)}
            >
              {topico.titulo || topico.nome ||
                (topico.slug || topico.Slug
                  ? (topico.slug || topico.Slug)
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())
                  : topico)
              }
            </li>
          ));
        })()}
      </ul>
    </div>
  );
}
