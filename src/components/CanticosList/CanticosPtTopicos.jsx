
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import "./CanticosPtTopicos.css";

export default function CanticosPtTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/topicos')
      .then(res => {
        setTopicos(Array.isArray(res.data) ? res.data : []);
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
    "Glória",
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

  // Qualquer tópico que o admin crie e que ainda não conste da ordem acima
  // continua a aparecer (no fim da lista) em vez de ser omitido em silêncio.
  const outrosTopicos = topicos.filter(
    (t) => !ordemDesejada.includes(t.nome || t.titulo || t)
  );
  const todosOsTopicos = [...topicosOrdenados, ...outrosTopicos];

  // Redireciona para a página do tópico
  const handleTopicoClick = (topico) => {
    const nome = encodeURIComponent(topico.nome || topico.titulo || topico);
    navigate(`/canticos/portugues/topico/${nome}`);
  };

  return (
    <div className="canticos-pt-topicos-container">
      

      {loading && <div>Carregando...</div>}
      {error && <div className="erro">Erro: {error}</div>}

      <ul className="canticos-pt-topicos-list">
        {todosOsTopicos.map((topico, idx) => (
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
