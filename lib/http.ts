/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from '@/app/store';
import axios from 'axios';
import Router from 'next/router'; // Import the singleton Router object

const api = async (endpoint: string, options: any = {}) => {
  // Get the idToken dynamically from the zustand store
  const { idToken } = useAuthStore.getState();

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
    (response) => {
      return response;
    },
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
