import React, { useState } from "react";
import { searchContent } from "../../api/search";
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchContent(query);
      setResults(data);
    } catch (err) {
      setError("Erro ao buscar resultados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-bar-form">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar-input"
        />

        <button type="submit" className="search-bar-button" aria-label="Procurar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>

      {loading && <div className="search-bar-loading">Buscando...</div>}
      {error && <div className="search-bar-error">{error}</div>}

      {results && (
        <div className="search-bar-results">
          {Object.values(results).every((v) => v.length === 0) ? (
            <div>Nenhum resultado encontrado.</div>
          ) : (
            <>
              {results.noticias?.length > 0 && (
                <div>
                  <h4>Notícias</h4>
                  <ul>
                    {results.noticias.map((n) => (
                      <li key={n.id}>{n.titulo}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.canticos?.length > 0 && (
                <div>
                  <h4>Cânticos</h4>
                  <ul>
                    {results.canticos.map((c) => (
                      <li key={c.id}>{c.titulo}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.topicos?.length > 0 && (
                <div>
                  <h4>Tópicos</h4>
                  <ul>
                    {results.topicos.map((t) => (
                      <li key={t.id}>{t.titulo}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
