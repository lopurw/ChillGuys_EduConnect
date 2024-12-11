import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

import CourseList from './CourseList';
import MyCourses from './MyCourses';
import classes from '../styles/NavProfile.module.css';

const NavProfile = () => {
	const role = localStorage.getItem('userRole');
	const [selectedTab, setSelectedTab] = useState('personalInfo');
	const [isEditable, setIsEditable] = useState(false);
	const [userData, setUserData] = useState({
		login: 'user123',
		password: 'password123',
		firstName: 'Иван',
		lastName: 'Иванов',
		middleName: 'Иванович',
		birthDate: '01.01.1990',
		photo: 'https://via.placeholder.com/100',
		institution: 'МГУ',
		company: 'ООО Рога и Копыта',
		contactNumber: '123-456-7890',
		techStack: 'React, JavaScript, Node.js, Express',
		englishLevel: 'Intermediate',
		additionalInfo: 'Готов к удаленной работе, активно учусь и развиваюсь.',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUserData((prevData) => ({
					...prevData,
					photo: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const getTabs = () => {
		if (role === 'StudentProfile') {
			return ['personalInfo', 'portfolio', 'myCourses', 'projects'];
		} else if (role === 'ManagerProfile') {
			return ['personalInfo', 'myCourses'];
		} else if (role === 'работодатель') {
			return ['personalInfo', 'vacancies'];
		}
		return ['personalInfo'];
	};

	const renderTabContent = () => {
		switch (selectedTab) {
			case 'personalInfo':
				return (
					<div className={classes.main_info_wrapper}>
						<div className={classes.main_info_block}>
							<div className={classes.main_info_block_img}>
								<img src={userData.photo} alt="Фото профиля" onClick={() => document.getElementById('photoInput').click()} />
								<input id="photoInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
							</div>
							<div className={classes.main_info_block_text_info_block}>
								<h3>Личная информация</h3>
								<div className={classes.main_info_block_text_info}>
									<div>Логин: {isEditable ? <input type="text" name="login" value={userData.login} onChange={handleInputChange} /> : userData.login}</div>
									<div>Пароль: {isEditable ? <input type="password" name="password" value={userData.password} onChange={handleInputChange} /> : userData.password}</div>
									<div>Имя: {isEditable ? <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} /> : userData.firstName}</div>
									<div>Фамилия: {isEditable ? <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} /> : userData.lastName}</div>
									<div>Отчество: {isEditable ? <input type="text" name="middleName" value={userData.middleName} onChange={handleInputChange} /> : userData.middleName}</div>
									<div>Дата рождения: {isEditable ? <input type="date" name="birthDate" value={userData.birthDate} onChange={handleInputChange} /> : userData.birthDate}</div>
									<div>
										{role === 'студент' && (
											<div>Место обучения: {isEditable ? <input type="text" name="institution" value={userData.institution} onChange={handleInputChange} /> : userData.institution}</div>
										)}
										{role === 'преподаватель' && (
											<div>Название учреждения: {isEditable ? <input type="text" name="institution" value={userData.institution} onChange={handleInputChange} /> : userData.institution}</div>
										)}
										{role === 'работодатель' && (
											<div>Название компании: {isEditable ? <input type="text" name="company" value={userData.company} onChange={handleInputChange} /> : userData.company}</div>
										)}
									</div>
									<div>Контактный номер: {isEditable ? <input type="text" name="contactNumber" value={userData.contactNumber} onChange={handleInputChange} /> : userData.contactNumber}</div>
								</div>

								<button onClick={() => setIsEditable(!isEditable)} className={classes.mainContentButton}>
									{isEditable ? 'Сохранить изменения' : 'Редактировать'}
								</button>
							</div>
						</div>
					</div>
				);
			case 'portfolio':
				return (
					<div id="portfolio-content" className={classes.mainContent}>
						<h3>Портфолио</h3>
						<div className={classes.portfolio_img_block}>
							<img src={userData.photo} alt="Фото профиля" />
						</div>
						<div className={classes.portfolio_main_info}>
							<div className={classes.portfolio_main_info_block}>
								<p>
									Имя: {userData.firstName} {userData.lastName} {userData.middleName}
								</p>
								<p>Стек технологий: {userData.techStack}</p>
								<p>
									Уровень английского:{' '}
									{isEditable ? (
										<select name="englishLevel" value={userData.englishLevel} onChange={handleInputChange}>
											<option value="Beginner">Начальный</option>
											<option value="Intermediate">Средний</option>
											<option value="Advanced">Продвинутый</option>
											<option value="Fluent">Свободно</option>
										</select>
									) : (
										userData.englishLevel
									)}
								</p>
							</div>

							<div className={classes.portfolio_main_info_block}>
								<p>Дополнительная информация: {isEditable ? <input type="text" name="additionalInfo" value={userData.additionalInfo} onChange={handleInputChange} /> : userData.additionalInfo}</p>
								<div>
									<div>Зарплата: {isEditable ? <input type="number" name="salary" value={userData.salary} onChange={handleInputChange} /> : userData.salary}</div>
									<div>Расписание: {isEditable ? <input type="text" name="schedule" value={userData.schedule} onChange={handleInputChange} /> : userData.schedule}</div>
									<div>Страна: {isEditable ? <input type="text" name="country" value={userData.country} onChange={handleInputChange} /> : userData.country}</div>
								</div>
							</div>
						</div>
						<h3>Курсы:</h3>
						<MyCourses />
						<div className={classes.portfolio_main_buttons}>
							<button onClick={downloadPortfolio} className={classes.downloadButton}>
								Скачать PDF
							</button>
							<button onClick={() => setIsEditable(!isEditable)} className={classes.mainContentButton}>
								{isEditable ? 'Сохранить изменения' : 'Редактировать'}
							</button>
						</div>
					</div>
				);

			case 'myCourses':
				return <MyCourses />;
			case 'projects':
				return <div>Заглушка для проектов</div>;
			case 'vacancies':
				return <div>Заглушка для вакансий</div>;
			default:
				return <div>Выберите вкладку</div>;
		}
	};

	const downloadPortfolio = () => {
		const element = document.getElementById('portfolio-content');
		const opt = {
			margin: 1,
			filename: 'portfolio.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
		};
		html2pdf().from(element).set(opt).save();
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.profile_wrapper}>
					<div className={classes.sidebar}>
						<h2>Навигация</h2>
						<ul>
							{getTabs().map((tab) => (
								<li key={tab}>
									<button onClick={() => setSelectedTab(tab)} className={classes.sidebarButton}>
										{tab === 'personalInfo' ? 'Личная информация' : tab === 'portfolio' ? 'Портфолио' : tab === 'myCourses' ? 'Мои курсы' : tab === 'projects' ? 'Проекты' : 'Вакансии'}
									</button>
								</li>
							))}
						</ul>
					</div>

					<div className={classes.mainContent}>{renderTabContent()}</div>
				</div>
			</div>
		</div>
	);
};

export default NavProfile;
