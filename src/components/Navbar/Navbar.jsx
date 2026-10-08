import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../SearchBar";
import TemaToggle from "./TemaToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const fechar = () => setMenuOpen(false);

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
          <li className="navbar-canticos">
            <span tabIndex={0}>Cânticos <i className="fa-solid fa-chevron-down navbar-seta" aria-hidden="true" /></span>
            <ul className="navbar-canticos-dropdown">
              <li><Link to="/canticos/portugues" onClick={fechar}>Português</Link></li>
              <li><Link to="/canticos/umbundu" onClick={fechar}>Umbundu</Link></li>
              <li><Link to="/canticos/kimbundu" onClick={fechar}>Kimbundu</Link></li>
              <li><Link to="/canticos/latim" onClick={fechar}>Latim</Link></li>
              <li><Link to="/canticos/otchikwama" onClick={fechar}>Oshikwanhama</Link></li>
            </ul>
          </li>
          <li className="navbar-catequese">
            <span tabIndex={0}>Catequese <i className="fa-solid fa-chevron-down navbar-seta" aria-hidden="true" /></span>
            <ul className="navbar-catequese-dropdown">
              <li><Link to="/catequese/portugues" onClick={fechar}>Português</Link></li>
              <li><Link to="/catequese/umbundu" onClick={fechar}>Umbundu</Link></li>
              <li><Link to="/catequese/latim" onClick={fechar}>Latim</Link></li>
              <li><Link to="/catequese/otchikwama" onClick={fechar}>Oshikwanhama</Link></li>
            </ul>
          </li>
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
