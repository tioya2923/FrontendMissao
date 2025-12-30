import React from 'react';

export default function CatecismoUbTopico({ topico }) {
  return (
    <div className="catecismo-ub-topico-item">
      <h3>{topico.Nome}</h3>
      <p>Slug: {topico.Slug}</p>
    </div>
  );
}
