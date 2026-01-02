
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams, Link } from "react-router-dom";

export default function CanticoCompleto() {
  const { slug } = useParams(); // <-- agora correto
  const [cantico, setCantico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api.get(`/api/Canticos/${encodeURIComponent(slug)}`)
      .then(res => {
        setCantico(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="canticos-pt-topicos-container">


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
