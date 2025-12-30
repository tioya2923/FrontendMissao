import React from 'react';

export default function CatecismoPtTopico({ topico }) {
  return (
    <div className="catecismo-pt-topico-item">
      <h3>{topico.Nome}</h3>
      <p>Slug: {topico.Slug}</p>
    </div>
  );
}
