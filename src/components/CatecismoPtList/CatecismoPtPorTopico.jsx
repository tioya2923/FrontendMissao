
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams, Link } from "react-router-dom";

export default function CatecismoPtPorTopico() {
  const { nome } = useParams(); // slug do tópico
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api.get(`/api/catecismopt/perguntas-com-topico`)
      .then(res => {
        const arr = Array.isArray(res.data) ? res.data : [];
        const filtradas = arr.filter(p =>
          p.topico &&
          p.topico.slug &&
          p.topico.slug.toLowerCase() === nome.toLowerCase()
        );
        setPerguntas(filtradas);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [nome]);

  return (
    <div className="catecismo-pt-topicos-container">
      {loading && <div>Carregando perguntas...</div>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}
      {!loading && !error && perguntas.length === 0 && (
        <div style={{ color: "#888" }}>Nenhuma pergunta para este tópico.</div>
      )}
      {!loading && !error && perguntas.length > 0 && (
        <ul className="catecismo-pt-topicos-list">
          {[...perguntas]
            .sort((a, b) => {
              const tA = (a.pergunta || a).toLocaleLowerCase();
              const tB = (b.pergunta || b).toLocaleLowerCase();
              return tA.localeCompare(tB);
            })
            .map((p, i) => (
              <li key={p.id || i}>
                <Link
                  to={`/catecismo/portugues/pergunta/${p.slug}`}
                  style={{
                    color: "#1976d2",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  {p.pergunta}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
