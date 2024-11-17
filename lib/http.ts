/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from '@/app/store';
import { decodeJWT } from '@aws-amplify/auth';
import axios from 'axios';
import Router from 'next/router'; // Import the singleton Router object


// Helper function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = decodeJWT(token); // Decode the token
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decoded.payload.exp < currentTime; // Check if the token is expired
  } catch (err) {
    console.error('Error decoding token', err);
    return true; // Treat as expired if decoding fails
  }
};

const api = async (endpoint: string, options: any = {}) => {
  const { idToken } = useAuthStore.getState(); // Access auth store

  // If token is expired, redirect to login page
  if (!idToken || isTokenExpired(idToken)) {
    console.log('Token is expired or missing, redirecting to /login');
    localStorage.removeItem('auth-storage');
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('Cognito')) {
        localStorage.removeItem(key);
      }
    });

    window.location.href = '/login'; // Perform a hard page reload
    return Promise.reject(new Error('Token expired or missing'));
  }

  // Set up headers with the idToken
  const headers = {
    Authorization: `Bearer ${idToken}`,
    'Content-Type': 'application/json',
    ...options.headers, // Merge with any additional headers provided
  };

  // Create an axios instance for this request
  const instance = axios.create({
    baseURL: 'https://api.findamovie.me',
    headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;

      if (response && response.status === 401) {
        console.log('401 Unauthorized detected');
        Router.push('/login'); // Redirect to login page
      }

      return Promise.reject(error);
    }
  );

  // Extract the method, body (data), and other options
  const { method = 'GET', data, ...restOptions }: any = options;

  // Return the axios request with the provided endpoint, method, body, and other options
  return instance.request({
    url: endpoint,
    method,
    data, // Include body for POST, PUT, or PATCH requests
    ...restOptions, // Merge with any additional options (e.g., params)
  });
};

export default api;
