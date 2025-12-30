import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CanticosUbPorTopico() {
  const { nome } = useParams(); // slug do tópico
  const [canticos, setCanticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/umbundu/canticos/canticos-com-topico`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar cânticos");
        return res.json();
      })
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        const filtrados = arr.filter(c =>
          c.topico &&
          c.topico.slug &&
          c.topico.slug.toLowerCase() === nome.toLowerCase()
        );
        setCanticos(filtrados);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [nome]);

  return (
    <div className="canticos-ub-topicos-container">
      {/* Título do tópico removido conforme solicitado */}

      {loading && <div>Carregando cânticos...</div>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}
      {!loading && !error && canticos.length === 0 && (
        <div style={{ color: "#888" }}>Nenhum cântico para este tópico.</div>
      )}

      {!loading && !error && canticos.length > 0 && (
        <ul className="canticos-ub-topicos-list">
          {[...canticos]
            .sort((a, b) => {
              const tA = (a.titulo || a.nome || a).toLocaleLowerCase();
              const tB = (b.titulo || b.nome || b).toLocaleLowerCase();
              return tA.localeCompare(tB);
            })
            .map((c, i) => (
              <li key={c.id || i}>
                <Link
                  to={`/canticos/umbundu/cantico/${c.slug}`}
                  style={{
                    color: "#1976d2",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  {c.titulo || c.nome || c}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
