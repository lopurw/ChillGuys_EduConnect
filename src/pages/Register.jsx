import React, { useState } from 'react';
import classes from '../styles/Register.module.css';
import { register } from '../services/ApiServ';

const Register = () => {
	const [roleType, setRoleType] = useState('student');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		profileImage: '',
		department: '',
		position: '',
		specialization: '',
		degree: '',
		enrollmentNumber: '',
		enrollmentDate: '',
		major: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleRoleChange = (e) => {
		setRoleType(e.target.value);
		// Очистка данных, специфичных для роли
		setFormData((prev) => ({
			...prev,
			department: '',
			position: '',
			specialization: '',
			degree: '',
			enrollmentNumber: '',
			enrollmentDate: '',
			major: '',
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError('Пароли не совпадают.');
			return;
		}

		setError('');
		try {
			let roleData;
			if (roleType === 'manager') {
				roleData = {
					Department: formData.department,
					Position: formData.position,
				};
			} else if (roleType === 'teacher') {
				roleData = {
					Specialization: formData.specialization,
					Degree: formData.degree,
				};
			} else if (roleType === 'student') {
				const now = new Date();
				roleData = {
					EnrollmentNumber: formData.enrollmentNumber,
					EnrollmentDate: new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000),
					Major: formData.major,
				};
			}

			const userData = {
				email: formData.email,
				password: formData.password,
				name: formData.name,
				profileImage: formData.profileImage,
				roleType,
				roleData,
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
		<div className={classes.main}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<h2>Регистрация</h2>

				{error && <p style={{ color: 'red' }}>{error}</p>}
				{success && <p style={{ color: 'green' }}>{success}</p>}

				<div className={classes.inputs_container}>
					<div className={classes.form_container}>
						<label>
							Имя
							<input type="text" name="name" value={formData.name} onChange={handleChange} required />
						</label>
					</div>

					<div className={classes.form_container}>
						<label>
							Электронная почта
							<input type="email" name="email" value={formData.email} onChange={handleChange} required />
						</label>
					</div>

					<div className={classes.form_container}>
						<label>
							Пароль
							<input type="password" name="password" value={formData.password} onChange={handleChange} required />
						</label>
					</div>

					<div className={classes.form_container}>
						<label>
							Подтвердите пароль
							<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
						</label>
					</div>

					<div className={classes.form_container}>
						<label>
							Изображение профиля (URL)
							<input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="Введите URL изображения" />
						</label>
					</div>

					<div className={classes.form_container}>
						<label>
							Роль
							<select name="roleType" value={roleType} onChange={handleRoleChange} required>
								<option value="student">Студент</option>
								<option value="teacher">Преподаватель</option>
								<option value="manager">Менеджер</option>
							</select>
						</label>
					</div>

					{/* Role-specific fields */}
					{roleType === 'manager' && (
						<>
							<div className={classes.form_container}>
								<label>
									Департамент
									<input type="text" name="department" value={formData.department} onChange={handleChange} required />
								</label>
							</div>
							<div className={classes.form_container}>
								<label>
									Позиция
									<input type="text" name="position" value={formData.position} onChange={handleChange} required />
								</label>
							</div>
						</>
					)}

					{roleType === 'teacher' && (
						<>
							<div className={classes.form_container}>
								<label>
									Специализация
									<input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
								</label>
							</div>
							<div className={classes.form_container}>
								<label>
									Степень
									<input type="text" name="degree" value={formData.degree} onChange={handleChange} required />
								</label>
							</div>
						</>
					)}

					{roleType === 'student' && (
						<>
							<div className={classes.form_container}>
								<label>
									Номер зачисления
									<input type="number" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} required />
								</label>
							</div>
							<div className={classes.form_container}>
								<label>
									Дата зачисления
									<input type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} required />
								</label>
							</div>
							<div className={classes.form_container}>
								<label>
									Специальность
									<input type="text" name="major" value={formData.major} onChange={handleChange} required />
								</label>
							</div>
						</>
					)}
				</div>

				<button type="submit" className={classes.button}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default Register;
