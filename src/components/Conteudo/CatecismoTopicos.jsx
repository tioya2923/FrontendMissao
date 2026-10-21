import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import { idiomaInexistente, codigoDoSlug } from "../../idiomas";

// Tópicos de Catecismo / Orações de qualquer idioma (só os que têm conteúdo).
export default function CatecismoTopicos() {
  const { idioma } = useParams();
  const codigo = codigoDoSlug(idioma);
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading/error before re-fetching
    setLoading(true);
    setError(null);
    setTopicos([]);

    api.get("/api/catecismopttopicos/topicos", { params: { idioma: codigo } })
      .then(res => {
        if (ignore) return;
        setTopicos(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        if (ignore) return;
        if (!idiomaInexistente(err)) setError(err.message);
        setLoading(false);
      });
    return () => { ignore = true; };
  }, [codigo]);

  return (
    <div className="catecismo-topicos-container">
      {loading && <div className="loading">Carregando tópicos...</div>}
      {error && <div className="erro">Erro: {error}</div>}
      {!loading && !error && topicos.length === 0 && (
        <div className="vazio">Ainda não há conteúdo disponível neste idioma.</div>
      )}
      {topicos.length > 0 && (
        <ul className="catecismo-topicos-list">
          {topicos.map(t => (
            <li key={t.id}>
              <Link to={`/catecismo/${idioma}/topico/${t.id}`}>{t.titulo}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
