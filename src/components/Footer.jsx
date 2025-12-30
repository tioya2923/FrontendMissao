import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Projecto Missão</h3>
          <p>Levando esperança e transformação para Huambo, Angola.</p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Huambo, Angola</p>
          <p>Email: contacto@projectomissao.ao</p>
          <p>Tel: +244 XXX XXX XXX</p>
        </div>
        <div className="footer-section">
          <h4>Ligações Rápidas</h4>
          <p><a href="/">Início</a></p>
          <p><a href="/about">Sobre Nós</a></p>
          <p><a href="/services">Serviços</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Projecto Missão. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
