
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams, Link } from "react-router-dom";

export default function CanticoCompleto() {
  const { slug } = useParams(); // <-- agora correto
  const [cantico, setCantico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading/error before re-fetching when slug changes
    setLoading(true);
    setError(null);

    api.get(`/api/Canticos/${encodeURIComponent(slug)}`)
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
    <div className="canticos-pt-topicos-container">


      {loading && <div>Carregando cântico...</div>}
      {error && <div className="erro">Erro: {error}</div>}

      {cantico && (
        <div>
          <h2>{cantico.titulo || cantico.nome}</h2>

          <pre className="letra">
            {cantico.letra || cantico.texto || cantico.conteudo || "Sem conteúdo."}
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
