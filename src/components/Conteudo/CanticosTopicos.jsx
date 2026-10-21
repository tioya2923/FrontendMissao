import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import { idiomaInexistente, codigoDoSlug, ORDEM_LITURGICA, porNumeroOuTitulo } from "../../idiomas";

// Cânticos de qualquer idioma: lista de tópicos (pela ordem litúrgica) ou, se o idioma só tem
// um tópico, directamente a lista de cânticos (com o número do livro, quando o há).
export default function CanticosTopicos() {
  const { idioma } = useParams();
  const codigo = codigoDoSlug(idioma);
  const [topicos, setTopicos] = useState([]);
  const [canticos, setCanticos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    setTopicos([]);
    setCanticos(null);

    (async () => {
      try {
        const { data } = await api.get("/api/topicos", { params: { idioma: codigo } });
        const lista = (Array.isArray(data) ? data : []).filter(t => (t.nome || "").toLowerCase() !== "geral");
        let unicos = null;
        if (lista.length === 1) {
          const r = await api.get(`/api/canticos/topico/${encodeURIComponent(lista[0].slug)}`, { params: { idioma: codigo } });
          unicos = Array.isArray(r.data) ? r.data : [];
        }
        if (ignore) return;
        setTopicos(lista);
        setCanticos(unicos);
      } catch (err) {
        if (!ignore && !idiomaInexistente(err)) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [codigo]);

  const ordenados = [
    ...ORDEM_LITURGICA.map(nome => topicos.find(t => t.nome === nome)).filter(Boolean),
    ...topicos.filter(t => !ORDEM_LITURGICA.includes(t.nome)),
  ];

  return (
    <div className="canticos-topicos-container">
      {loading && <div className="loading">Carregando...</div>}
      {error && <div className="erro">Erro: {error}</div>}
      {!loading && !error && topicos.length === 0 && (
        <div className="vazio">Ainda não há cânticos disponíveis neste idioma.</div>
      )}

      {!loading && !error && canticos ? (
        <ul className="canticos-topicos-list">
          {[...canticos].sort(porNumeroOuTitulo).map(c => (
            <li key={c.id}>
              <Link to={`/canticos/${idioma}/cantico/${encodeURIComponent(c.slug)}`}>
                {c.numero ? `${c.numero}. ` : ""}{c.titulo}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && topicos.length > 0 && (
          <ul className="canticos-topicos-list">
            {ordenados.map(t => (
              <li key={t.id}>
                <Link to={`/canticos/${idioma}/topico/${encodeURIComponent(t.slug || t.nome)}`}>{t.nome}</Link>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
