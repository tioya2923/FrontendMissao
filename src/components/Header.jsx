import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Projecto Missão</h1>
          <p className="subtitle">Huambo, Angola</p>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/about" className="nav-link">Sobre Nós</Link>
          <Link to="/services" className="nav-link">Serviços</Link>
          <Link to="/contact" className="nav-link">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
