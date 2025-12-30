import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <section className="page-header">
        <h1>Entre em Contacto</h1>
        <p>Estamos aqui para servir você</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Informações de Contacto</h2>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-details">
              <h3>Localização</h3>
              <p>Huambo, Angola</p>
              <p>Endereço completo disponível mediante contacto</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-details">
              <h3>Email</h3>
              <p>contacto@projectomissao.ao</p>
              <p>info@projectomissao.ao</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-details">
              <h3>Telefone</h3>
              <p>+244 XXX XXX XXX</p>
              <p>Disponível de Segunda a Sexta: 9h00 - 17h00</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">⏰</div>
            <div className="info-details">
              <h3>Horários de Culto</h3>
              <p>Domingos: 9h00 e 16h00</p>
              <p>Quartas: 18h00 (Culto de Oração)</p>
              <p>Sextas: 19h00 (Estudo Bíblico)</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Envie-nos uma Mensagem</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Seu nome" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="seu@email.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+244 XXX XXX XXX" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Como podemos ajudar?" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Escreva sua mensagem aqui..." 
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">Enviar Mensagem</button>
          </form>
        </div>
      </section>

      <section className="visit-section">
        <h2>Visite-nos</h2>
        <p>
          Venha nos conhecer pessoalmente! Estamos ansiosos para recebê-lo em nossa 
          comunidade. Todos são bem-vindos, independentemente da sua origem ou situação.
        </p>
        <div className="visit-info">
          <div className="visit-card">
            <h3>Primeira Visita?</h3>
            <p>Não se preocupe! Teremos prazer em recebê-lo e apresentá-lo à nossa família.</p>
          </div>
          <div className="visit-card">
            <h3>Estacionamento</h3>
            <p>Temos estacionamento gratuito disponível para todos os visitantes.</p>
          </div>
          <div className="visit-card">
            <h3>Acessibilidade</h3>
            <p>Nossas instalações são acessíveis para pessoas com mobilidade reduzida.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
