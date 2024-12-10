
import axios from 'axios';
const apiClient = axios.create({    baseURL: 'http://localhost:2211/api', 
    headers: {        'Content-Type': 'application/json',
    },});



    export const register = async (userData) => {    const response = await apiClient.post('/Auth/Register', userData);
        return response.data;};

        const login = async (userData) => {
            const response = await apiClient.post('/Auth/Login', userData);
            return response.data;
          };