import React from 'react';

const WHATSAPP_TEXTO = '+351 920 012 727';
const WHATSAPP_URL = 'https://wa.me/351920012727';
const EMAIL = 'ndatava3@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/amendatava/';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2>Contactos</h2>
      <ul className="contacto-lista">
        <li>
          <span className="contacto-etiqueta">WhatsApp</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{WHATSAPP_TEXTO}</a>
        </li>
        <li>
          <span className="contacto-etiqueta">E-mail</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </li>
        <li>
          <span className="contacto-etiqueta">Instagram</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@amendatava</a>
        </li>
      </ul>
      <p className="contacto-convite">
        Tem cânticos ou orações que gostaria de ver na Ndatava? Envie-os para o WhatsApp ou para o
        e-mail acima.
      </p>
    </div>
  );
};

export default Contacto;
