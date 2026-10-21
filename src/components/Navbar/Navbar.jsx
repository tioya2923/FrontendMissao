import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./Navbar.css";
import SearchBar from "../SearchBar";
import TemaToggle from "./TemaToggle";
import { IDIOMAS_BASE, slugDoCodigo } from "../../idiomas";

// Só os idiomas que têm conteúdo em cada secção (o servidor já os filtra). Qualquer idioma novo
// aparece sozinho. Se o pedido falhar, mostra os idiomas conhecidos, para o menu nunca ficar vazio por engano.
function useIdiomasComConteudo(secao) {
  const [idiomas, setIdiomas] = useState([]);
  useEffect(() => {
    let cancelado = false;
    api.get("/api/idiomas", { params: { secao } })
      .then(r => { if (!cancelado) setIdiomas(r.data.map(i => ({ codigo: i.codigo, nome: i.nome }))); })
      .catch(() => { if (!cancelado) setIdiomas(IDIOMAS_BASE); });
    return () => { cancelado = true; };
  }, [secao]);
  return idiomas;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const fechar = () => setMenuOpen(false);
  const idiomasCanticos = useIdiomasComConteudo("canticos");
  const idiomasCatequese = useIdiomasComConteudo("catecismo");

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
                {idiomasCanticos.map(i => (
                  <li key={i.codigo}><Link to={`/canticos/${slugDoCodigo(i.codigo)}`} onClick={fechar}>{i.nome}</Link></li>
                ))}
              </ul>
            </li>
          )}
          {idiomasCatequese.length > 0 && (
            <li className="navbar-catequese">
              <span tabIndex={0}>Catequese <i className="fa-solid fa-chevron-down navbar-seta" aria-hidden="true" /></span>
              <ul className="navbar-catequese-dropdown">
                {idiomasCatequese.map(i => (
                  <li key={i.codigo}><Link to={`/catequese/${slugDoCodigo(i.codigo)}`} onClick={fechar}>{i.nome}</Link></li>
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
