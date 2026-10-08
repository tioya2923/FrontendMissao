import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Ndatava. Todos os direitos reservados.</span>
        <span> · <Link to="/privacidade">Política de Privacidade</Link></span>
        <span> · <Link to="/eliminar-conta">Eliminar Conta</Link></span>
      </div>
    </footer>
  );
}
