import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Missão. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
