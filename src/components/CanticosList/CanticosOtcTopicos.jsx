
import React, { useEffect, useState } from "react";
import api from '../../api';
import { Link } from "react-router-dom";

export default function CanticosOtcTopicos() {
  const [canticos, setCanticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/canticos?idioma=otc')
      .then(res => {
        setCanticos(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const ordenados = [...canticos].sort((a, b) =>
      (a.titulo || '').localeCompare(b.titulo || '', 'pt')
  );

  return (
      <div className="canticos-kmb-topicos-container">
        {loading && <div>Carregando...</div>}
        {error && <div className="erro">Erro: {error}</div>}
        {!loading && !error && ordenados.length === 0 && (
          <div className="vazio">Ainda não há cânticos disponíveis neste idioma.</div>
        )}

        <ul className="canticos-kmb-topicos-list">
          {ordenados.map((cantico) => (
            <li key={cantico.id}>
              <Link to={`/canticos/otchikwama/cantico/${encodeURIComponent(cantico.slug)}`}>
                {cantico.titulo}
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
}
