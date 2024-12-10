import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment'; // Импортируем новый компонент Comment

const ProjectDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [newComment, setNewComment] = useState('');

	const projects = [
		{
			id: 1,
			title: 'Проект по React-разработке',
			description: 'Разработать интерактивное веб-приложение с использованием React.',
			category: 'Frontend',
			tasks: ['Создать компонент для отображения данных', 'Реализовать роутинг с React Router', 'Интегрировать API для получения данных'],
			additionalMaterials: [
				{ type: 'pdf', title: 'Документация по React', link: '/docs/react.pdf' },
				{ type: 'video', title: 'Введение в React', link: '/videos/react-intro.mp4' },
			],
			comments: [
				{ author: 'Иван Иванов', content: 'Отличный проект, все понятно!' },
				{ author: 'Мария Петрова', content: 'Есть пару замечаний по стилям, посмотрите.' },
			],
			image: 'https://via.placeholder.com/150',
		},
		{
			id: 2,
			title: 'Проект по разработке API',
			description: 'Создание RESTful API для управления данными пользователей.',
			category: 'Backend',
			tasks: ['Реализовать методы CRUD для пользователей', 'Добавить авторизацию и аутентификацию', 'Настроить серверную часть на Node.js'],
			additionalMaterials: [
				{ type: 'pdf', title: 'API документация', link: '/docs/api.pdf' },
				{ type: 'video', title: 'Введение в RESTful API', link: '/videos/api-intro.mp4' },
			],
			comments: [{ author: 'Сергей Сидоров', content: 'Как насчет добавления аутентификации через JWT?' }],
			image: 'https://via.placeholder.com/150',
		},
	];

	const project = projects.find((project) => project.id === parseInt(id));

	if (!project) {
		return <p>Проект не найден</p>;
	}

	const { title, description, category, tasks, additionalMaterials, comments, image } = project;

	const handleBack = () => {
		navigate(-1); 
	};

	const handleAddComment = () => {
		if (newComment) {
			const newCommentObject = { author: 'Аноним', content: newComment };
			project.comments.push(newCommentObject);
			setNewComment('');
		}
	};

	return (
		<div className="project-detail">
			<img src={image} alt={title} className="project-image" />

			<h2>{title}</h2>
			<p>
				<strong>Категория:</strong> {category}
			</p>
			<p>{description}</p>

			<h3>Задания/ТЗ</h3>
			<ul>
				{tasks.map((task, index) => (
					<li key={index}>{task}</li>
				))}
			</ul>

			<h3>Дополнительные материалы</h3>
			<ul>
				{additionalMaterials.map((material, index) => (
					<li key={index}>
						{material.type === 'pdf' ? (
							<a href={material.link} target="_blank" rel="noopener noreferrer">
								{material.title} (PDF)
							</a>
						) : (
							<a href={material.link} target="_blank" rel="noopener noreferrer">
								{material.title} (Видео)
							</a>
						)}
					</li>
				))}
			</ul>

			<h3>Комментарии</h3>
			<div className="comments">
				{comments.map((comment, index) => (
					<Comment key={index} author={comment.author} content={comment.content} />
				))}
			</div>

			<div className="add-comment">
				<textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Напишите комментарий..." />
				<button onClick={handleAddComment}>Добавить комментарий</button>
			</div>

			<button onClick={handleBack}>Назад к списку</button>
		</div>
	);
};

export default ProjectDetail;
