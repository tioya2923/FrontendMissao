
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import "./CanticosKmbTopicos.css";

// Ordem litúrgica habitual — os nomes dos tópicos são os mesmos termos em
// português usados em todos os idiomas (só a letra dos cânticos muda).
const ORDEM = [
  "Procissão", "Entrada", "Kyrie", "Entronização da Palavra", "Aleluia",
  "Oração dos Fiéis", "Ofertório", "Elevação", "Santo", "Saudação",
  "Cordeiro de Deus", "Comunhão", "Acção de Graças", "Saída",
];

export default function CanticosLatTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/topicos?idioma=lat')
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
    navigate(`/canticos/latim/topico/${encodeURIComponent(topico.slug)}`);
  };

  const filtrados = topicos.filter(t => (t.nome || '').toLowerCase() !== 'geral');
  const ordenados = ORDEM.map(nome => filtrados.find(t => t.nome === nome)).filter(Boolean);
  const outros = filtrados.filter(t => !ORDEM.includes(t.nome));
  const lista = [...ordenados, ...outros];

  return (
    <div className="canticos-kmb-topicos-container">
      {loading && <div>Carregando...</div>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}
      {!loading && !error && lista.length === 0 && (
        <div style={{ color: "#888" }}>Ainda não há cânticos disponíveis neste idioma.</div>
      )}

      <ul className="canticos-kmb-topicos-list">
        {lista.map((topico) => (
          <li
            key={topico.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleTopicoClick(topico)}
          >
            {topico.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
