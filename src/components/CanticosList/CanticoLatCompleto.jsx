
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams } from "react-router-dom";

export default function CanticoLatCompleto() {
  const { slug } = useParams();
  const [cantico, setCantico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading/error before re-fetching when slug changes
    setLoading(true);
    setError(null);
    api.get(`/api/canticos/${encodeURIComponent(slug)}?idioma=lat`)
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
  }, [slug]);

  return (
    <div className="canticos-kmb-topicos-container">
      {loading && <div>Carregando cântico...</div>}
      {error && <div className="erro">Erro: {error}</div>}
      {cantico && (
        <div>
          <h2>{cantico.titulo}</h2>
          <pre className="letra">
            {cantico.letra || "Sem conteúdo."}
          </pre>
          {cantico.autor && (
            <p className="autor">
              Letra e Música: {cantico.autor}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
