import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { token } = response.data;
          localStorage.setItem('token', token);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Stock related API calls
export const stockApi = {
  getQuote: async (symbol) => {
    const response = await api.get(`/stocks/quote/${symbol}`);
    return response.data;
  },

  getHistoricalData: async (symbol) => {
    const response = await api.get(`/stocks/historical/${symbol}`);
    return response.data;
  },

  searchStocks: async (query) => {
    const response = await api.get(`/stocks/search?query=${query}`);
    return response.data;
  },

  getNews: async (category = 'all') => {
    const response = await api.get(`/stocks/news?category=${category}`);
    return response.data;
  },
};

// Portfolio related API calls
export const portfolioApi = {
  getPortfolio: async () => {
    const response = await api.get('/portfolio');
    return response.data;
  },

  addStock: async (stockData) => {
    const response = await api.post('/portfolio', stockData);
    return response.data;
  },

  removeStock: async (symbol) => {
    const response = await api.delete(`/portfolio/${symbol}`);
    return response.data;
  },

  updateStock: async (symbol, stockData) => {
    const response = await api.put(`/portfolio/${symbol}`, stockData);
    return response.data;
  },
};

// Watchlist related API calls
export const watchlistApi = {
  getWatchlist: async () => {
    const response = await api.get('/watchlist');
    return response.data;
  },

  addToWatchlist: async (symbol) => {
    const response = await api.post('/watchlist', { symbol });
    return response.data;
  },

  removeFromWatchlist: async (symbol) => {
    const response = await api.delete(`/watchlist/${symbol}`);
    return response.data;
  },
};

// Auth related API calls
export const authApi = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  updatePassword: async (passwordData) => {
    const response = await api.put('/auth/password', passwordData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },
};

export default api; 