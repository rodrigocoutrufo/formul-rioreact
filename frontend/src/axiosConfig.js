import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',  // URL do seu backend Flask
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Se precisar de credenciais (como cookies)
});

export default api;

