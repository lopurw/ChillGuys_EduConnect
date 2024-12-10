import React, { useState } from 'react';
import ProjectCard from './ProjectCard'; // Импортируем ProjectCard
import { Link } from 'react-router-dom';
import classes from '../styles/ProjectList.module.css';

const ProjectList = () => {
	const [selectedProject, setSelectedProject] = useState(null);

	const projects = [
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

	const handleStartProject = (project) => {
		setSelectedProject(project);
		
		console.log('Перешли на проект', project);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.project_list}>
					<h2>Мои проекты</h2>
					<div>
						{projects.length > 0 ? (
							projects.map((project) => (
								<ProjectCard project={project} onStartProject={handleStartProject} />
							))
						) : (
							<p>Нет проектов для отображения</p>
						)}
					</div>
				</div>
			</div>
		</div>

	);
};

export default ProjectList;
