import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo ao Projecto Missão</h1>
          <p className="hero-subtitle">
            Transformando vidas e comunidades em Huambo, Angola
          </p>
          <div className="hero-buttons">
            <a href="/about" className="btn btn-primary">Conheça-nos</a>
            <a href="/contact" className="btn btn-secondary">Entre em Contacto</a>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <h2>Nossa Missão</h2>
        <p>
          Somos dedicados a trazer esperança, educação e desenvolvimento espiritual 
          para a comunidade de Huambo. Através de programas e serviços, procuramos 
          fazer a diferença na vida das pessoas.
        </p>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🙏</div>
          <h3>Serviços Espirituais</h3>
          <p>Cultos regulares, estudos bíblicos e momentos de oração</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Educação</h3>
          <p>Programas educacionais e de capacitação para todas as idades</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">❤️</div>
          <h3>Ação Social</h3>
          <p>Apoio às famílias e comunidades necessitadas</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👨‍👩‍👧‍👦</div>
          <h3>Comunidade</h3>
          <p>Construindo relacionamentos fortes e duradouros</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Junte-se a Nós</h2>
        <p>Venha fazer parte desta família e descobrir o propósito que Deus tem para sua vida.</p>
        <a href="/contact" className="btn btn-large">Visite-nos</a>
      </section>
    </div>
  );
}

export default Home;
