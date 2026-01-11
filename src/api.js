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

export default api;