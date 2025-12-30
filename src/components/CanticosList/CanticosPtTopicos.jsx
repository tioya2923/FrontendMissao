import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CanticosPtTopicos.css";

export default function CanticosPtTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/topicos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar tópicos");
        return res.json();
      })
      .then((data) => {
        setTopicos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Ordem desejada dos tópicos
  const ordemDesejada = [
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
    "Saída",
  ];

  // Normaliza e ordena os tópicos recebidos
  const topicosOrdenados = ordemDesejada
    .map((nome) =>
      topicos.find((t) => (t.nome || t.titulo || t) === nome)
    )
    .filter(Boolean);

  // Redireciona para a página do tópico
  const handleTopicoClick = (topico) => {
    const nome = encodeURIComponent(topico.nome || topico.titulo || topico);
    navigate(`/canticos/portugues/topico/${nome}`);
  };

  return (
    <div className="canticos-pt-topicos-container">
      <h2>Cânticos em Português</h2>

      {loading && <div>Carregando...</div>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}

      <ul className="canticos-pt-topicos-list">
        {topicosOrdenados.map((topico, idx) => (
          <li
            key={idx}
            style={{ cursor: "pointer" }}
            onClick={() => handleTopicoClick(topico)}
          >
            {topico.nome || topico.titulo || topico}
          </li>
        ))}
      </ul>
    </div>
  );
}
