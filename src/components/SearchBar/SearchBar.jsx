import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchContent } from "../../api/search";
import "./SearchBar.css";

const SECTIONS = [
  {
    key: "canticos",
    label: "Cânticos (Português)",
    href: (item) => `/canticos/portugues/cantico/${encodeURIComponent(item.slug)}`,
    display: (item) => item.titulo,
  },
  {
    key: "canticosUmb",
    label: "Cânticos (Umbundu)",
    href: (item) => `/canticos/umbundu/cantico/${encodeURIComponent(item.slug)}`,
    display: (item) => item.titulo,
  },
  {
    key: "topicos",
    label: "Tópicos — Cânticos (Português)",
    href: (item) => `/canticos/portugues/topico/${encodeURIComponent(item.nome)}`,
    display: (item) => item.nome,
  },
  {
    key: "topicosUmb",
    label: "Tópicos — Cânticos (Umbundu)",
    href: (item) => `/canticos/umbundu/topicos/${encodeURIComponent(item.nome)}`,
    display: (item) => item.nome,
  },
  {
    key: "catecismosPt",
    label: "Catecismo (Português)",
    href: (item) => `/catecismo/portugues/titulo/${item.id}`,
    display: (item) => item.titulo,
  },
  {
    key: "catecismosUb",
    label: "Catecismo (Umbundu)",
    href: (item) => `/catecismo/umbundu/titulo/${item.id}`,
    display: (item) => item.titulo,
  },
  {
    key: "eventos",
    label: "Calendário",
    href: () => `/calendario`,
    display: (item) => item.titulo,
  },
];

// Idiomas além de Português e Umbundu: onde fica cada tipo de página no site.
const ROTAS_IDIOMA = {
  lat: {
    cantico: (slug) => `/canticos/latim/cantico/${encodeURIComponent(slug)}`,
    topico: (_slug, nome) => `/canticos/latim/topico/${encodeURIComponent(nome)}`,
    catecismo: (id) => `/catecismo/latim/titulo/${id}`,
  },
  kmb: {
    cantico: (slug) => `/canticos/kimbundu/cantico/${encodeURIComponent(slug)}`,
    topico: (slug) => `/canticos/kimbundu/topicos/${encodeURIComponent(slug)}`,
  },
  otc: {
    cantico: (slug) => `/canticos/otchikwama/cantico/${encodeURIComponent(slug)}`,
    topico: (_slug, nome) => `/canticos/otchikwama/topico/${encodeURIComponent(nome)}`,
    catecismo: (id) => `/catecismo/otchikwama/titulo/${id}`,
  },
};

function seccoesDosOutrosIdiomas(outros) {
  const seccoes = [];
  for (const idioma of outros ?? []) {
    const rotas = ROTAS_IDIOMA[idioma.codigo];
    if (!rotas) continue; // idioma ainda sem páginas no site
    if (rotas.cantico && idioma.canticos?.length)
      seccoes.push({ key: `${idioma.codigo}-canticos`, label: `Cânticos (${idioma.nome})`, items: idioma.canticos,
        href: (i) => rotas.cantico(i.slug), display: (i) => i.titulo });
    if (rotas.topico && idioma.topicos?.length)
      seccoes.push({ key: `${idioma.codigo}-topicos`, label: `Tópicos — Cânticos (${idioma.nome})`, items: idioma.topicos,
        href: (i) => rotas.topico(i.slug, i.nome), display: (i) => i.nome });
    if (rotas.catecismo && idioma.catecismos?.length)
      seccoes.push({ key: `${idioma.codigo}-catecismo`, label: `Catecismo (${idioma.nome})`, items: idioma.catecismos,
        href: (i) => rotas.catecismo(i.id), display: (i) => i.titulo });
  }
  return seccoes;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const close = () => { setResults(null); setQuery(""); };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setResults(await searchContent(query));
    } catch {
      setError("Erro ao pesquisar.");
    } finally {
      setLoading(false);
    }
  };

  const extras = seccoesDosOutrosIdiomas(results?.outrosIdiomas);
  const hasResults = results && (SECTIONS.some(s => results[s.key]?.length > 0) || extras.length > 0);

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-bar-form">
        <input
          ref={inputRef}
          type="text"
          placeholder="Pesquisar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar-input"
          autoComplete="off"
        />
        <button type="submit" className="search-bar-button" aria-label="Pesquisar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      {loading && <div className="search-bar-loading">A pesquisar...</div>}
      {error && <div className="search-bar-error">{error}</div>}

      {results && (
        <div className="search-bar-results">
          <button className="search-bar-close" onClick={close} aria-label="Fechar">✕</button>

          {!hasResults ? (
            <p className="search-bar-empty">Nenhum resultado encontrado.</p>
          ) : (
            [
              ...SECTIONS.map(section => ({ ...section, items: results[section.key] })),
              ...extras,
            ].map(section => {
              const items = section.items;
              if (!items?.length) return null;
              return (
                <div key={section.key} className="search-bar-section">
                  <h4 className="search-bar-section-title">{section.label}</h4>
                  <ul className="search-bar-list">
                    {items.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={section.href(item)}
                          className="search-bar-item"
                          onClick={close}
                        >
                          {section.display(item)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
