import React, { useState } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:2211/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

const login = async (userData) => {
  const response = await apiClient.post('/Auth/Login', userData);
  return response.data;
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await login(formData); 
      setSuccess('Вход выполнен успешно!');
      console.log('Ответ сервера:', response);
      localStorage.setItem('userRole', response.role);
    } catch (err) {
      setError('Ошибка входа. Проверьте введённые данные.');
      console.error('Ошибка:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div>
        <label>
          Электронная почта:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Пароль:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;
