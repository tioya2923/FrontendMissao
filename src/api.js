import axios from 'axios';

// Define a URL base priorizando a variável de ambiente segura
const baseURL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('http://', 'https://') 
  : 'https://backendmissaohuambo.onrender.com';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Anexa o token da sessão ativa (Gestor ou Loja, consoante a área do site) a todos os pedidos
api.interceptors.request.use((config) => {
  const emAreaDeLoja = window.location.pathname.startsWith('/loja');
  const token = emAreaDeLoja
    ? localStorage.getItem('loja_token')
    : localStorage.getItem('gestor_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;