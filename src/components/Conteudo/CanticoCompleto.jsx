import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { codigoDoSlug } from "../../idiomas";

// Um cântico completo, em qualquer idioma.
export default function CanticoCompleto() {
  const { idioma, slug } = useParams();
  const codigo = codigoDoSlug(idioma);
  const [cantico, setCantico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading/error before re-fetching
    setLoading(true);
    setError(null);

    api.get(`/api/canticos/${encodeURIComponent(slug)}`, { params: { idioma: codigo } })
      .then(res => {
        if (ignore) return;
        setCantico(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (ignore) return;
        setError(err.message);
        setLoading(false);
      });
    return () => { ignore = true; };
  }, [codigo, slug]);

  return (
    <div className="canticos-topicos-container">
      {loading && <div className="loading">Carregando cântico...</div>}
      {error && <div className="erro">Erro: {error}</div>}

      {cantico && (
        <div>
          <h2>{cantico.numero ? `${cantico.numero}. ` : ""}{cantico.titulo}</h2>
          <pre className="letra">{cantico.letra || "Sem conteúdo."}</pre>
          {cantico.autor && <p className="autor">Letra e Música: {cantico.autor}</p>}
        </div>
      )}
    </div>
  );
}
