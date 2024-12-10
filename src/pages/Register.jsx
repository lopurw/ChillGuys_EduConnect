import React, { useState } from 'react';
import { register } from '../services/ApiServ'; 
import styles from '../styles/Register.module.css';


const Register = () => {
  const [role, setRole] = useState('user'); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleSpecificField: '',
    additionalInfo: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData((prev) => ({ ...prev, roleSpecificField: '', additionalInfo: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    setError(''); 
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
        roleSpecificField: formData.roleSpecificField,
        additionalInfo: formData.additionalInfo,
      };
      const response = await register(userData); 
      setSuccess('Регистрация прошла успешно!');
      console.log('Ответ сервера:', response);
    } catch (err) {
      setError('Произошла ошибка при регистрации. Попробуйте снова.');
      console.error('Ошибка:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}


      <div>
        <label>
          Имя:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>

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

      <div>
        <label>
          Подтвердите пароль:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
      </div>

 
      <div>
        <label>
          Роль:
          <select name="role" value={role} onChange={handleRoleChange} required>
            <option value="user">Пользователь</option>
            <option value="teacher">Преподаватель</option>
            <option value="employer">Работодатель</option>
          </select>
        </label>
      </div>

 
      {role === 'teacher' && (
        <div>
          <label>
            Специализация:
            <input
              type="text"
              name="roleSpecificField"
              value={formData.roleSpecificField}
              onChange={handleChange}
              placeholder="Например, Математика, Физика"
              required
            />
          </label>
        </div>
      )}

      {role === 'employer' && (
        <div>
          <label>
            Название компании:
            <input
              type="text"
              name="roleSpecificField"
              value={formData.roleSpecificField}
              onChange={handleChange}
              placeholder="Введите название компании"
              required
            />
          </label>
        </div>
      )}

      {role === 'user' && (
        <div>
          <label>
            Хобби или интересы:
            <input
              type="text"
              name="roleSpecificField"
              value={formData.roleSpecificField}
              onChange={handleChange}
              placeholder="Например, чтение, походы"
            />
          </label>
        </div>
      )}

  
      <div>
        <label>
          Дополнительная информация:
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Расскажите о себе"
          />
        </label>
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Register;
