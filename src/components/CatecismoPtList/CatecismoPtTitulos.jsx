
import React, { useEffect, useState } from "react";
import api from '../../api';
import { Link, useParams } from "react-router-dom";

export default function CatecismoPtTitulos() {
  const { topicoId } = useParams();
  const [titulos, setTitulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/catecismopt?topicoId=${topicoId}`)
      .then(res => {
        setTitulos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [topicoId]);

  if (loading) return <div className="loading">Carregando títulos...</div>;

  return (
    <div className="section">
      {/* <h2>Títulos do Tópico</h2> */}
      <ul>
        {titulos.map(item => (
          <li key={item.id}>
            <Link to={`/catecismo/portugues/titulo/${item.id}`}>{item.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
