import axios from 'axios';
import { store } from '../app/store'; // Importa lo store Redux

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Porta corretta per json-server-auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere il token di autenticazione ad ogni richiesta
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;