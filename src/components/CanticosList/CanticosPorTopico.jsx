
import React, { useEffect, useState } from "react";
import api from '../../api';
import { useParams, Link } from "react-router-dom";

export default function CanticosPorTopico() {
    const { nome } = useParams(); // <-- este é o parâmetro correto
    const [canticos, setCanticos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        api.get(`/api/Canticos/topico/${encodeURIComponent(nome)}`)
            .then(res => {
                setCanticos(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [nome]);

    return (
        <div className="canticos-pt-topicos-container">
            {/* Título do tópico removido conforme solicitado */}



            {loading && <div>Carregando cânticos...</div>}
            {error && <div style={{ color: "red" }}>Erro: {error}</div>}
            {!loading && !error && canticos.length === 0 && (
                <div style={{ color: "#888" }}>Nenhum cântico para este tópico.</div>
            )}

            {!loading && !error && canticos.length > 0 && (
                <ul className="canticos-pt-topicos-list">
                    {[...canticos]
                        .sort((a, b) => {
                            const tA = (a.titulo || a.nome || a).toLocaleLowerCase();
                            const tB = (b.titulo || b.nome || b).toLocaleLowerCase();
                            return tA.localeCompare(tB);
                        })
                        .map((c, i) => (
                            <li key={c.id || i}>
                                <Link
                                    to={`/canticos/portugues/cantico/${c.slug}`}
                                    style={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    {c.titulo || c.nome || c}
                                </Link>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
