import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./Navbar.css";
import SearchBar from "../SearchBar";
import TemaToggle from "./TemaToggle";

// Páginas que o site tem para cada idioma (código da API → endereço). Um idioma sem página aqui não aparece.
const PAGINAS_CANTICOS = { pt: "portugues", umb: "umbundu", kmb: "kimbundu", lat: "latim", otc: "otchikwama" };
const PAGINAS_CATEQUESE = { pt: "portugues", umb: "umbundu", lat: "latim", otc: "otchikwama" };
const NOMES = { pt: "Português", umb: "Umbundu", kmb: "Kimbundu", lat: "Latim", otc: "Oshikwanhama" };

// Só os idiomas que têm conteúdo em cada secção (o servidor já os filtra).
// Se o pedido falhar, mostra todos os que o site tem, para o menu nunca ficar vazio por engano.
function useIdiomasComConteudo(secao, paginas) {
  const [codigos, setCodigos] = useState(null);
  useEffect(() => {
    let cancelado = false;
    api.get("/api/idiomas", { params: { secao } })
      .then(r => { if (!cancelado) setCodigos(r.data.map(i => i.codigo)); })
      .catch(() => { if (!cancelado) setCodigos(Object.keys(paginas)); });
    return () => { cancelado = true; };
  }, [secao, paginas]);
  return (codigos || []).filter(c => paginas[c]);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const fechar = () => setMenuOpen(false);
  const idiomasCanticos = useIdiomasComConteudo("canticos", PAGINAS_CANTICOS);
  const idiomasCatequese = useIdiomasComConteudo("catecismo", PAGINAS_CATEQUESE);

  return (
    <header className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo" onClick={fechar} aria-label="Ndatava — página inicial">
          NDATAVA
        </Link>
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
        </button>
      </div>
      <nav>
        <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
          <li><Link to="/calendario" onClick={fechar}>Calendário</Link></li>
          {idiomasCanticos.length > 0 && (
            <li className="navbar-canticos">
              <span tabIndex={0}>Cânticos <i className="fa-solid fa-chevron-down navbar-seta" aria-hidden="true" /></span>
              <ul className="navbar-canticos-dropdown">
                {idiomasCanticos.map(c => (
                  <li key={c}><Link to={`/canticos/${PAGINAS_CANTICOS[c]}`} onClick={fechar}>{NOMES[c]}</Link></li>
                ))}
              </ul>
            </li>
          )}
          {idiomasCatequese.length > 0 && (
            <li className="navbar-catequese">
              <span tabIndex={0}>Catequese <i className="fa-solid fa-chevron-down navbar-seta" aria-hidden="true" /></span>
              <ul className="navbar-catequese-dropdown">
                {idiomasCatequese.map(c => (
                  <li key={c}><Link to={`/catequese/${PAGINAS_CATEQUESE[c]}`} onClick={fechar}>{NOMES[c]}</Link></li>
                ))}
              </ul>
            </li>
          )}
          <li><Link to="/contacto" onClick={fechar}>Contacto</Link></li>
          <li><Link to="/sobre" onClick={fechar}>Sobre</Link></li>
          <li><Link to="/apoiar" onClick={fechar}>Apoiar</Link></li>
          <li><Link to="/loja/login" onClick={fechar}>Vender no Ndatava</Link></li>
          <li className="navbar-searchbar-wrapper">
            <SearchBar />
          </li>
          <li className="navbar-tema-wrapper">
            <TemaToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
