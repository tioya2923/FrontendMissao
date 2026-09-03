
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../SearchBar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">
          <img src="/logo-ndatava.svg" alt="Ndatava" style={{ height: "48px", marginRight: "12px" }} />
        </Link>
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? (
            <span style={{ fontSize: 36, color: '#fff', fontWeight: 'bold', lineHeight: 1 }}>&#10005;</span>
          ) : (
            <span style={{ fontSize: 32, color: '#fff' }}>&#9776;</span>
          )}
        </button>
      </div>
      {/* SearchBar será movida para depois de 'Sobre' */}
      <ul
        className={`navbar-links${menuOpen ? ' open' : ''}`}
      >
        <li><Link to="/calendario" onClick={() => setMenuOpen(false)}>Calendário</Link></li>
        <li className="navbar-canticos">
          <span>Cânticos</span>
          <ul className="navbar-canticos-dropdown">
            <li><Link to="/canticos/portugues" onClick={() => setMenuOpen(false)}>Português</Link></li>
            <li><Link to="/canticos/umbundu" onClick={() => setMenuOpen(false)}>Umbundu</Link></li>
            <li><Link to="/canticos/kimbundu" onClick={() => setMenuOpen(false)}>Kimbundu</Link></li>
            <li><Link to="/canticos/latim" onClick={() => setMenuOpen(false)}>Latim</Link></li>
            <li><Link to="/canticos/otchikwama" onClick={() => setMenuOpen(false)}>Otchikwama</Link></li>
          </ul>
        </li>
        <li className="navbar-catequese">
          <span>Catequese</span>
          <ul className="navbar-catequese-dropdown">
            <li><Link to="/catequese/portugues" onClick={() => setMenuOpen(false)}>Português</Link></li>
            <li><Link to="/catequese/umbundu" onClick={() => setMenuOpen(false)}>Umbundu</Link></li>
            <li><Link to="/catequese/latim" onClick={() => setMenuOpen(false)}>Latim</Link></li>
            <li><Link to="/catequese/otchikwama" onClick={() => setMenuOpen(false)}>Otchikwama</Link></li>
          </ul>
        </li>
        <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
        <li><Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link></li>
        <li><Link to="/apoiar" onClick={() => setMenuOpen(false)}>Apoiar</Link></li>
        <li><Link to="/loja/login" onClick={() => setMenuOpen(false)}>Vender no Ndatava</Link></li>
        <li className="navbar-searchbar-wrapper">
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
}
