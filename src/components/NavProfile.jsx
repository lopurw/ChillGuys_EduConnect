import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import MyCourses from './MyCourses';
import classes from '../styles/NavProfile.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getUserById, updateUser } from '../services/ApiServ'; // Add updateUser here
import ProjectList from './ProjectList';
import CourseList from './CourseList';
import Vacancies from './VacancyList';

const NavProfile = () => {
	const [selectedTab, setSelectedTab] = useState('personalInfo');
	const [isEditable, setIsEditable] = useState(false);
	const [userData, setUserData] = useState({});
	const [outData, setUserOutData] = useState({});
	const [loading, setLoading] = useState(false);

	const fieldLabels = {
		id: 'ID',
		name: 'Имя',
		email: 'Электронная почта',
		profileImage: 'Фото профиля',
		createdAt: 'Дата создания',
		updatedAt: 'Дата обновления',
		roleName: 'Роль',
		roleDetails: 'Детали роли',
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await getUserById(localStorage.getItem('userId'));
				if (response?.data) {
					const user = response.data;
					setUserData({
						id: user.id,
						name: user.name,
						email: user.email,
						profileImage: user.profileImage,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
						roleName: user.roleName,
						roleDetails: user.roleDetails,
					});
					setUserOutData({
						name: user.name,
						email: user.email,
						createdAt: new Date(user.createdAt).toLocaleDateString(),
						updatedAt: new Date(user.updatedAt).toLocaleDateString(),
						roleDetails: user.roleDetails,
					});
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, []);

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
					profileImage: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSaveChanges = async () => {
		setLoading(true);
		try {
			const response = await updateUser(userData); // Send the updated data
			if (response?.statusCode === 200) {
				console.log('Данные обновлены.');
			} else {
				alert('Ошибка при обновлении данных.');
			}
			setIsEditable(false);
		} catch (error) {
			alert('Произошла ошибка при сохранении данных.');
			console.error('Update Error:', error);
		} finally {
			setLoading(false);
		}
	};

	const downloadPortfolio = async () => {
		const element = document.getElementById('portfolio-content');
		try {
			const canvas = await html2canvas(element, {
				scale: 2, // Увеличение разрешения
				useCORS: true, // Разрешение на загрузку кросс-доменных ресурсов (например, изображений)
				backgroundColor: '#ffffff', // Установить белый фон, если он не указан в CSS
				ignoreElements: (element) => element.classList.contains('no-pdf'), // Игнорировать элементы с определённым классом
			});
			const imgData = canvas.toDataURL('image/png');

			const pdf = new jsPDF('p', 'mm', 'a4');
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Сохраняем пропорции

			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
			pdf.save('portfolio.pdf');
		} catch (error) {
			console.error('Ошибка при создании PDF:', error);
		}
	};

	const renderTabContent = () => {
		switch (selectedTab) {
			case 'personalInfo':
				return (
					<div className={classes.main_info_wrapper}>
						<div className={classes.main_info_block}>
							<div className={classes.main_info_block_img}>
								<img src={userData.profileImage} alt="Фото профиля" onClick={() => isEditable && document.getElementById('photoInput').click()} />
								<input id="photoInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
							</div>
							<div className={classes.main_info_block_text_info_block}>
								<h3>Личная информация</h3>
								<div className={classes.main_info_block_text_info}>
									{Object.keys(userData).map(
										(key) =>
											key !== 'id' && key !== 'profileImage' ? (
												<div key={key}>
													<strong>{fieldLabels[key] || key}:</strong>{' '}
													{isEditable && key !== 'createdAt' && key !== 'updatedAt' ? <input type="text" name={key} value={userData[key] || ''} onChange={handleInputChange} /> : userData[key]}
												</div>
											) : null // Не рендерить ничего для id и profileImage
									)}
								</div>
								<button
									onClick={() => {
										if (isEditable) {
											handleSaveChanges();
										} else {
											setIsEditable(true);
										}
									}}
									className={classes.mainContentButton}
									disabled={loading}
								>
									{loading ? 'Сохранение...' : isEditable ? 'Сохранить изменения' : 'Редактировать'}
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
							<img src={userData.profileImage} alt="Фото профиля" />
						</div>
						<div className={classes.portfolio_main_info}>
							<div className={classes.portfolio_main_info_block}>
								<p>
									Имя: {userData.name} {userData.lastName} {userData.middleName}
								</p>
								<p>Стек технологий: HTML/CSS</p>
							</div>

							<div className={classes.portfolio_main_info_block}>
								<p>Дополнительная информация: {isEditable ? <input type="text" name="additionalInfo" value={userData.additionalInfo} onChange={handleInputChange} /> : userData.roleDetails}</p>
								<div>
									<div>Страна: Беларусь</div>
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
				return (
					<div>
						<MyCourses />
					</div>
				);

			case 'Courses':
				return (
					<div>
						<CourseList />
					</div>
				);

			case 'Vacancies':
				return (
					<div>
						<Vacancies />
					</div>
				);

			case 'projects':
				return (
					<div>
						<ProjectList />
					</div>
				);

			default:
				return <div>Выберите вкладку</div>;
		}
	};

	const getTabs = () => {
		switch (userData.roleName) {
			case 'StudentProfile':
				return ['personalInfo', 'portfolio', 'myCourses', 'projects'];
			case 'TeacherProfile':
				return ['personalInfo', 'Courses'];
			case 'ManagerProfile':
				return ['personalInfo', 'Vacancies'];
			default:
				return ['personalInfo'];
		}
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
										{tab === 'personalInfo'
											? 'Личная информация'
											: tab === 'portfolio'
											? 'Портфолио'
											: tab === 'myCourses'
											? 'Мои курсы'
											: tab === 'projects'
											? 'Проекты'
											: tab === 'Vacancies'
											? 'Вакансии'
											: tab === 'Courses'
											? 'Курсы'
											: tab}
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
