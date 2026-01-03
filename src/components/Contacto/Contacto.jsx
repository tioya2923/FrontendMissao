import React from 'react';
import './Contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2>Contactos</h2>
      <p>
        Se deseja entrar em contacto connosco para obter mais informações, esclarecer dúvidas ou enviar sugestões, utilize uma das alternativas abaixo. Estamos disponíveis para o ajudar!
      </p>
      <ul className="contacto-list">
        <li><strong>Tel:</strong> +244 943 448 081</li>
        <li><strong>Email:</strong> missaonohuambo@gmail.com</li>
      </ul>
    </div>
  );
};

export default Contacto;
