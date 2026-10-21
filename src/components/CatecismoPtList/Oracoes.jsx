import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api";

// Orações é só mais um tópico do Catecismo em Português. Esta rota antiga procura-o pelo nome
// (em vez de depender de um número fixo) e leva para a lista normal de títulos desse tópico.
export default function Oracoes() {
  const [destino, setDestino] = useState(null);

  useEffect(() => {
    api.get("/api/catecismopttopicos/topicos", { params: { idioma: "pt" } })
      .then(res => {
        const oracoes = (Array.isArray(res.data) ? res.data : []).find(t => (t.slug || "").toLowerCase() === "oracoes");
        setDestino(oracoes ? `/catecismo/portugues/topico/${oracoes.id}` : "/catecismo/portugues");
      })
      .catch(() => setDestino("/catecismo/portugues"));
  }, []);

  return destino ? <Navigate to={destino} replace /> : <div className="loading">A abrir…</div>;
}
