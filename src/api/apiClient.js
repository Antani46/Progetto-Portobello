import axios from 'axios';

// Configurazione del client Axios
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

//Interceptor per le richieste HTTP
apiClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Aggiunge il token se l'utente è autenticato
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