import classes from '../styles/Login.module.css';
import React, { useState } from 'react';
import { login } from '../services/ApiServ';

const Login = () => {
	const [formData, setFormData] = useState({
		userName: '',
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
			localStorage.setItem('userRole', response.data.role);
			localStorage.setItem('userId', response.data.userId);
			localStorage.setItem('token', response.data.token);
			window.location.href = '/homeuser';
		} catch (err) {
			setError('Ошибка входа. Проверьте введённые данные.');
			console.error('Ошибка:', err);
		}
	};

	return (
		<div className={classes.main}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<h2>Вход</h2>

				{error && <p style={{ color: 'red' }}>{error}</p>}
				{success && <p style={{ color: 'green' }}>{success}</p>}

				<div className={classes.inputs_container}>
					<div className={classes.form_container}>
						<label>
							Электронная почта
							<input type="userName" name="userName" value={formData.userName} onChange={handleChange} required />
						</label>
					</div>

					<div className={classes.form_container}>
						<label>
							Пароль
							<input type="password" name="password" value={formData.password} onChange={handleChange} required />
						</label>
					</div>
				</div>

				<button className={classes.button} type="submit">
					Войти
				</button>
			</form>
		</div>
	);
};

export default Login;
