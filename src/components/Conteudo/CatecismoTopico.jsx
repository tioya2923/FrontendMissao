import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import { idiomaInexistente, codigoDoSlug } from "../../idiomas";

// Um tópico de Catecismo / Orações: os seus subtópicos (se tiver) e as suas perguntas ou textos.
export default function CatecismoTopico() {
  const { idioma, topicoId } = useParams();
  const codigo = codigoDoSlug(idioma);
  const [subtopicos, setSubtopicos] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading/error before re-fetching
    setLoading(true);
    setError(null);
    setSubtopicos([]);
    setEntradas([]);

    Promise.all([
      api.get(`/api/catecismopttopicos/topicos/${topicoId}/subtopicos`),
      api.get("/api/catecismopt", { params: { topicoId, idioma: codigo } }),
    ])
      .then(([sub, ent]) => {
        if (ignore) return;
        setSubtopicos(Array.isArray(sub.data) ? sub.data : []);
        setEntradas(Array.isArray(ent.data) ? ent.data : []);
        setLoading(false);
      })
      .catch(err => {
        if (ignore) return;
        if (!idiomaInexistente(err)) setError(err.message);
        setLoading(false);
      });
    return () => { ignore = true; };
  }, [codigo, topicoId]);

  return (
    <div className="catecismo-topicos-container">
      {loading && <div className="loading">Carregando...</div>}
      {error && <div className="erro">Erro: {error}</div>}
      {!loading && !error && subtopicos.length === 0 && entradas.length === 0 && (
        <div className="vazio">Ainda não há conteúdo neste tópico.</div>
      )}

      {subtopicos.length > 0 && (
        <ul className="catecismo-topicos-list">
          {subtopicos.map(t => (
            <li key={`t${t.id}`}>
              <Link to={`/catecismo/${idioma}/topico/${t.id}`}>{t.titulo}</Link>
            </li>
          ))}
        </ul>
      )}
      {entradas.length > 0 && (
        <ul className="catecismo-topicos-list">
          {entradas.map(e => (
            <li key={`e${e.id}`}>
              <Link to={`/catecismo/${idioma}/titulo/${e.id}`}>{e.titulo}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
