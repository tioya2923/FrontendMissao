import React from "react";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importação necessária

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <div className="title-footer">Junte-se a nós</div>

          <div className="social-icons">
            <a href="https://www.facebook.com/missaonohuambo/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://zeno.fm/radio/radiomissio-ide-e-anunciai" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-tower-broadcast"></i> {/* Corrigido */}
            </a>
            <a href="https://www.instagram.com/missaonohuambo/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@missaonohuambo5266" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com/@missaonohuambo" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://www.flickr.com/photos/fotosdamissaonohuambo/with/52264207612" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-flickr"></i>
            </a>
            <a href="https://www.linkedin.com/in/miss%C3%A3o-no-huambo-135ba1247/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <span>© {new Date().getFullYear()} Missão. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
