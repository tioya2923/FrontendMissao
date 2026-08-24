
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams } from "react-router-dom";

export default function CanticoKmbCompleto() {
  const { slug } = useParams();
  const [cantico, setCantico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading/error before re-fetching when slug changes
    setLoading(true);
    setError(null);
    api.get(`/api/kimbundu/canticos/${slug}`)
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
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}
      {cantico && (
        <div>
          <h2>{cantico.titulo || cantico.nome}</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              fontSize: "1.1em",
              background: "#f8f8f8",
              padding: 16,
              borderRadius: 8,
            }}
          >
            {cantico.letra || cantico.texto || cantico.conteudo || "Sem conteúdo."}
          </pre>
        </div>
      )}
    </div>
  );
}
