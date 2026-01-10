import axios from 'axios';


// Força HTTPS na URL da API
let baseURL = import.meta.env.VITE_API_URL || 'https://backendmissaohuambo.onrender.com';
if (baseURL.startsWith('http://')) {
  baseURL = baseURL.replace('http://', 'https://');
}

const api = axios.create({
  baseURL: baseURL
});

export default api;
