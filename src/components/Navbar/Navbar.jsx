import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoMissao from "../../assets/logo-missao.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logoMissao} alt="Missão no Huambo" style={{ height: "60px", marginRight: "12px" }} />
      </Link>
      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {menuOpen ? (
          <span style={{ fontSize: 36, color: '#fff', fontWeight: 'bold', lineHeight: 1 }}>&#10005;</span> // X
        ) : (
          <span style={{ fontSize: 32, color: '#fff' }}>&#9776;</span> // ☰
        )}
      </button>
      <ul
        className={`navbar-links${menuOpen ? ' open' : ''}`}
      >
        <li><Link to="/calendario" onClick={() => setMenuOpen(false)}>Calendário</Link></li>
        <li className="navbar-canticos">
          <span>Cânticos</span>
          <ul className="navbar-canticos-dropdown">
            <li><Link to="/canticos/portugues" onClick={() => setMenuOpen(false)}>Português</Link></li>
            <li><Link to="/canticos/umbundu" onClick={() => setMenuOpen(false)}>Umbundu</Link></li>
          </ul>
        </li>
        <li className="navbar-catequese">
          <span>Catequese</span>
          <ul className="navbar-catequese-dropdown">
            <li><Link to="/catequese/portugues" onClick={() => setMenuOpen(false)}>Português</Link></li>
            <li><Link to="/catequese/umbundu" onClick={() => setMenuOpen(false)}>Umbundu</Link></li>
          </ul>
        </li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Contacto</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Sobre</a></li>
      </ul>
    </nav>
  );
}
