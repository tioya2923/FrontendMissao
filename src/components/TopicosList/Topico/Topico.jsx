import React from 'react';

export default function Topico({ topico }) {
  return (
    <div className="topico-item">
      <h3>{topico.Nome}</h3>
      <p>Slug: {topico.Slug}</p>
    </div>
  );
}
