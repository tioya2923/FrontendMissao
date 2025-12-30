import React from 'react';

export default function TopicoUmb({ topico }) {
  return (
    <div className="topico-umb-item">
      <h3>{topico.Nome}</h3>
      <p>Slug: {topico.Slug}</p>
    </div>
  );
}
