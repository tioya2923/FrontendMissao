import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import { idiomaInexistente, codigoDoSlug, porNumeroOuTitulo } from "../../idiomas";

// Cânticos de um tópico, em qualquer idioma.
export default function CanticosPorTopico() {
  const { idioma, slug } = useParams();
  const codigo = codigoDoSlug(idioma);
  const [canticos, setCanticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading/error before re-fetching
    setLoading(true);
    setError(null);
    setCanticos([]);

    api.get(`/api/canticos/topico/${encodeURIComponent(slug)}`, { params: { idioma: codigo } })
      .then(res => {
        if (ignore) return;
        setCanticos(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        if (ignore) return;
        if (!idiomaInexistente(err)) setError(err.message);
        setLoading(false);
      });
    return () => { ignore = true; };
  }, [codigo, slug]);

  return (
    <div className="canticos-topicos-container">
      {loading && <div className="loading">Carregando cânticos...</div>}
      {error && <div className="erro">Erro: {error}</div>}
      {!loading && !error && canticos.length === 0 && (
        <div className="vazio">Nenhum cântico para este tópico.</div>
      )}

      {!loading && !error && canticos.length > 0 && (
        <ul className="canticos-topicos-list">
          {[...canticos].sort(porNumeroOuTitulo).map((c, i) => {
            const numero = c.numero ?? i + 1;
            return (
              <li key={c.id}>
                <Link to={`/canticos/${idioma}/cantico/${encodeURIComponent(c.slug)}`} state={{ numero }}>
                  {numero}. {c.titulo}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
