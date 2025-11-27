import axios from 'axios';

export const loginRequest = async (credentials) => {
  const response = await axios.post('/api/v1/login', credentials);
  return response.data;
};

