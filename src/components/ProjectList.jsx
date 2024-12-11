import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard'; // Импорт ProjectCard
import { Link } from 'react-router-dom';
import { getAllProjects } from '../services/ApiServ.js';
import classes from '../styles/ProjectList.module.css';

const ProjectList = () => {
	const [projects, setProjects] = useState([]); // Состояние для хранения проектов
	const [selectedProject, setSelectedProject] = useState(null);

	// Функция для загрузки проектов из API
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await getAllProjects();
				setProjects(response.data); // Предполагаем, что в response есть поле data с проектами
			} catch (error) {
				console.error('Ошибка при загрузке проектов:', error);
			}
		};

		fetchProjects();
	}, []);

	// Локальный список проектов для тестирования или в случае отсутствия данных с сервера
	const localProjects = [
		{
			id: 1,
			title: 'Проект по React-разработке',
			employer: 'Компания A',
			duration: '3 месяца',
			description: 'Создание интерактивного веб-приложения с использованием React.',
			image: 'https://via.placeholder.com/150',
		},
		{
			id: 2,
			title: 'Проект по разработке API',
			employer: 'Компания B',
			duration: '6 месяцев',
			description: 'Создание RESTful API для управления данными пользователей.',
			image: 'https://via.placeholder.com/150',
		},
		{
			id: 3,
			title: 'Проект по разработке UI',
			employer: 'Компания C',
			duration: '4 месяца',
			description: 'Разработка пользовательского интерфейса для корпоративной платформы.',
			image: 'https://via.placeholder.com/150',
		},
	];

	// Функция для обработки события начала работы с проектом
	const handleStartProject = (project) => {
		setSelectedProject(project);
		console.log('Перешли на проект:', project);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.project_list}>
					<h2>Мои проекты</h2>
					<div className="project-cards">
						{(projects.length > 0 ? projects : localProjects).map((project) => (
							<ProjectCard project={project} onStartProject={handleStartProject} />
						))}
					</div>
					{projects.length === 0 && localProjects.length === 0 && (
						<p>Нет проектов для отображения</p> // "No projects to display"
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectList;
