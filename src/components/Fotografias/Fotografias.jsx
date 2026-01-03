import React, { useEffect, useState } from 'react';
import './Fotografias.css';

// Insira seu user_id do Flickr abaixo
const FLICKR_USER_ID = '196213097@N03';
const FLICKR_API_KEY = 'bd81050e8ac39860c8b02d6b3b15ec80';
const FLICKR_API_URL = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${FLICKR_API_KEY}&user_id=${FLICKR_USER_ID}&format=json&nojsoncallback=1&extras=url_m`;

const Fotografias = () => {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fotoSelecionada, setFotoSelecionada] = useState(null);

  useEffect(() => {
    fetch(FLICKR_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.photos && data.photos.photo) {
          setFotos(data.photos.photo);
        } else {
          setError('Nenhuma fotografia encontrada.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar fotografias.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="fotografias-container">Carregando fotografias...</div>;
  if (error) return <div className="fotografias-container">{error}</div>;

  return (
    <>
      <div className="fotografias-container">
        {fotos.slice(0, 12).map((foto) => (
          <div className="fotografia-item" key={foto.id}>
            <img
              className="fotografia-img"
              src={foto.url_m}
              alt={foto.title}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setFotoSelecionada(foto);
                setModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <a
          href="https://www.flickr.com/photos/fotosdamissaonohuambo/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#fff',
            color: '#111',
            padding: '10px 24px',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #111',
            transition: 'background 0.2s, color 0.2s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#111';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#111';
          }}
        >
          Mais Fotografias
        </a>
      </div>

      {/* Modal para exibir a foto completa */}
      {modalOpen && fotoSelecionada && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setModalOpen(false)}
        >
          <img
            src={fotoSelecionada.url_m}
            alt={fotoSelecionada.title}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 8,
              boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
              background: '#fff'
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setModalOpen(false)}
            style={{
              position: 'fixed',
              top: 24,
              right: 32,
              background: '#fff',
              color: '#1976d2',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              fontSize: 24,
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default Fotografias;
