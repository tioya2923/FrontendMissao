import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/fraunces';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa Font Awesome
import App from './App.jsx';
import './styles/paginas.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
