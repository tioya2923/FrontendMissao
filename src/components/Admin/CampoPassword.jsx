import { useState } from 'react';

// Campo de password com botão para mostrar/ocultar o texto — para o
// utilizador poder conferir o que escreveu antes de submeter o formulário.
export default function CampoPassword({ label, value, onChange, autoComplete, required, id }) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="admin-field">
      <label htmlFor={id}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={visivel ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          style={{ width: '100%', paddingRight: 40, boxSizing: 'border-box' }}
        />
        <button
          type="button"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
          style={{
            position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', color: '#666',
            padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className={`fa-solid ${visivel ? 'fa-eye-slash' : 'fa-eye'}`} />
        </button>
      </div>
    </div>
  );
}
