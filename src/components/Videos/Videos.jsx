import React, { useEffect, useState } from 'react';
import './Videos.css';


const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const MAX_RESULTS = 6;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null); // 👈 controla o vídeo ativo

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        );
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setVideos(data.items.filter(item => item.id && item.id.videoId));
        } else {
          setVideos([]);
          setError('Nenhum vídeo encontrado.');
        }
      } catch (err) {
        setError('Erro ao carregar vídeos.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div className="videos-container">Carregando vídeos...</div>;
  if (error) return <div className="videos-container">{error}</div>;

  return (
    <>
      <div className="videos-container">
        {videos.map((video) => {
          const videoId = video.id.videoId;
          const isActive = activeVideo === videoId;

          return (
            <div
              className="video-item"
              key={videoId}
              onClick={() => setActiveVideo(videoId)} // 👈 ativa o vídeo ao clicar
              style={{ cursor: 'pointer' }}
            >
              <iframe
                className="video-frame"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${isActive ? 1 : 0}`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="video-title">{video.snippet.title}</div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <a
          href="https://www.youtube.com/channel/UCxRbG-qhuGeF83gDV6BlXaA"
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
            transition: 'background 0.2s, color 0.2s',
            marginBottom: '50px'
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
          Mais Vídeos
        </a>
      </div>
    </>
  );
};

export default Videos;
