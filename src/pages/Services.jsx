import './Services.css';

function Services() {
  return (
    <div className="services">
      <section className="page-header">
        <h1>Nossos Serviços</h1>
        <p>Como servimos a comunidade de Huambo</p>
      </section>

      <section className="services-content">
        <div className="service-card">
          <div className="service-icon">⛪</div>
          <h2>Cultos e Celebrações</h2>
          <p>
            Realizamos cultos dominicais às 9h00 e 16h00, com momentos de louvor, 
            adoração e pregação da palavra. Todos são bem-vindos para participar 
            e experimentar a presença de Deus.
          </p>
          <ul>
            <li>Culto Dominical - 9h00 e 16h00</li>
            <li>Culto de Oração - Quartas-feiras, 18h00</li>
            <li>Estudo Bíblico - Sextas-feiras, 19h00</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">👶</div>
          <h2>Ministério Infantil</h2>
          <p>
            Nosso ministério infantil oferece um ambiente seguro e acolhedor onde 
            as crianças aprendem sobre os valores cristãos através de histórias, 
            músicas e actividades educativas.
          </p>
          <ul>
            <li>Escola Dominical para crianças</li>
            <li>Actividades recreativas</li>
            <li>Ensino bíblico adaptado para cada idade</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">🎓</div>
          <h2>Educação e Capacitação</h2>
          <p>
            Oferecemos programas educacionais para ajudar membros da comunidade a 
            desenvolver competências e melhorar suas oportunidades de vida.
          </p>
          <ul>
            <li>Aulas de alfabetização</li>
            <li>Cursos profissionalizantes</li>
            <li>Apoio escolar para jovens</li>
            <li>Workshops de desenvolvimento pessoal</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">🤝</div>
          <h2>Acção Social</h2>
          <p>
            Estamos comprometidos em ajudar os mais necessitados através de 
            programas de assistência social e apoio comunitário.
          </p>
          <ul>
            <li>Distribuição de alimentos</li>
            <li>Doação de roupas e materiais</li>
            <li>Visitas a hospitais e lares</li>
            <li>Apoio a famílias em situação de vulnerabilidade</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">👥</div>
          <h2>Grupos de Conexão</h2>
          <p>
            Pequenos grupos que se reúnem durante a semana para comunhão, 
            estudo e crescimento espiritual em um ambiente mais íntimo.
          </p>
          <ul>
            <li>Grupos de estudo bíblico</li>
            <li>Grupos de oração</li>
            <li>Grupos de jovens e adolescentes</li>
            <li>Grupos de casais e famílias</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">💒</div>
          <h2>Eventos Especiais</h2>
          <p>
            Organizamos eventos especiais ao longo do ano para celebrar, 
            ensinar e fortalecer nossa comunidade.
          </p>
          <ul>
            <li>Conferências e seminários</li>
            <li>Retiros espirituais</li>
            <li>Celebrações de datas especiais</li>
            <li>Eventos comunitários</li>
          </ul>
        </div>
      </section>

      <section className="cta-section">
        <h2>Participe Conosco</h2>
        <p>Venha conhecer nossos serviços e fazer parte desta família.</p>
        <a href="/contact" className="btn btn-light">Entre em Contacto</a>
      </section>
    </div>
  );
}

export default Services;
