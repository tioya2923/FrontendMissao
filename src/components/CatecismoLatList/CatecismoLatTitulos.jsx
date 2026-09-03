
import React, { useEffect, useState } from "react";
import api from '../../api';
import { Link, useParams } from "react-router-dom";
import "../CatecismoOtcList/CatecismoOtcTopicos.css";

export default function CatecismoLatTitulos() {
  const { topicoId } = useParams();
  const [titulos, setTitulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/catecismopt?topicoId=${topicoId}&idioma=lat`)
      .then(res => {
        setTitulos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [topicoId]);

  if (loading) return <div className="loading">Carregando títulos...</div>;

  return (
    <div className="catecismo-otc-topicos-container">
      <ul className="catecismo-otc-topicos-list">
        {titulos.map(item => (
          <li key={item.id}>
            <Link to={`/catecismo/latim/titulo/${item.id}`}>{item.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
