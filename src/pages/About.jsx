import './About.css';

function About() {
  return (
    <div className="about">
      <section className="page-header">
        <h1>Sobre o Projecto Missão</h1>
        <p>Conhecendo nossa história e propósito</p>
      </section>

      <section className="content-section">
        <div className="content-card">
          <h2>Quem Somos</h2>
          <p>
            O Projecto Missão é uma iniciativa dedicada a servir a comunidade de Huambo, 
            Angola, através de programas espirituais, educacionais e sociais. Desde a nossa 
            fundação, temos trabalhado incansavelmente para fazer a diferença na vida das 
            pessoas, oferecendo esperança, amor e apoio prático.
          </p>
        </div>

        <div className="content-card">
          <h2>Nossa Visão</h2>
          <p>
            Ser uma referência de transformação e esperança em Huambo, alcançando corações 
            e transformando vidas através do amor, serviço e dedicação. Sonhamos com uma 
            comunidade forte, unida e próspera.
          </p>
        </div>

        <div className="content-card">
          <h2>Nossos Valores</h2>
          <ul className="values-list">
            <li><strong>Fé:</strong> Fundamentamos tudo o que fazemos na fé e confiança em Deus</li>
            <li><strong>Amor:</strong> Praticamos o amor incondicional em todas as nossas ações</li>
            <li><strong>Integridade:</strong> Mantemos os mais altos padrões de honestidade</li>
            <li><strong>Serviço:</strong> Dedicamo-nos a servir com excelência e humildade</li>
            <li><strong>Comunidade:</strong> Valorizamos cada pessoa e relacionamento</li>
          </ul>
        </div>

        <div className="content-card">
          <h2>O Que Fazemos</h2>
          <div className="activities">
            <div className="activity">
              <h3>Serviços Religiosos</h3>
              <p>Cultos dominicais, estudos bíblicos semanais e momentos de oração</p>
            </div>
            <div className="activity">
              <h3>Programas Educacionais</h3>
              <p>Aulas de alfabetização, cursos profissionalizantes e apoio escolar</p>
            </div>
            <div className="activity">
              <h3>Assistência Social</h3>
              <p>Distribuição de alimentos, roupas e apoio a famílias necessitadas</p>
            </div>
            <div className="activity">
              <h3>Actividades Juvenis</h3>
              <p>Programas especiais para crianças e jovens com foco no desenvolvimento</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
