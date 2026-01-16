import axios from 'axios';

/**
 * Configurazione principale del client Axios.
 * Imposta l'URL di base e gli header comuni per le richieste API.
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor per le richieste HTTP.
 * Inietta automaticamente il token di autenticazione (se presente) negli header.
 */
apiClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Aggiunge il token Bearer se l'utente è autenticato
      if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;