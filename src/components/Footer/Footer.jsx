import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Ndatava. Todos os direitos reservados.</span>
        <span> · <Link to="/privacidade" style={{ color: 'inherit' }}>Política de Privacidade</Link></span>
        <span> · <Link to="/eliminar-conta" style={{ color: 'inherit' }}>Eliminar Conta</Link></span>
      </div>
    </footer>
  );
}
