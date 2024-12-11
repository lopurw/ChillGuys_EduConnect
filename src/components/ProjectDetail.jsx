import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../services/ApiServ.js'; // Assuming you have an API service to fetch project details
import Comment from './Comment'; // Component for rendering individual comments
import classes from '../styles/ProjectDetail.module.css'; // Import your CSS file

const ProjectDetail = () => {
	const { id } = useParams(); // Get project ID from URL
	const navigate = useNavigate(); // Navigation hook for "back" button
	const [project, setProject] = useState(null); // State for project data
	const [loading, setLoading] = useState(true); // Loading state for fetching project data
	const [newComment, setNewComment] = useState(''); // State for new comment input

	// Fetch project details on component mount
	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await getProjectById(id); // Fetch project by ID (assuming you have an API function)
				setProject(response.data); // Set project data
			} catch (error) {
				console.error('Error fetching project:', error);
			} finally {
				setLoading(false); // Set loading to false after fetching data
			}
		};

		fetchProject();
	}, [id]); // Dependency on 'id' so it runs whenever 'id' changes

	// Handle "back" button click
	const handleBack = () => {
		navigate('/'); // Navigate back to the homepage or project list page
	};

	// Function to handle adding a new comment
	const handleAddComment = () => {
		if (newComment) {
			const newCommentObject = { author: 'Аноним', content: newComment };
			setProject((prevProject) => ({
				...prevProject,
				comments: [...prevProject.comments, newCommentObject], // Add new comment to the project
			}));
			setNewComment(''); // Clear the comment input field
		}
	};

	// If loading, show loading message
	if (loading) {
		return <p>Загрузка данных проекта...</p>;
	}

	// If project not found
	if (!project) {
		return <p>Проект не найден</p>;
	}

	// Destructure project data
	const { title, description, category, tasks, additionalMaterials, comments, image } = project;

	// Process additional materials (if any) into separate arrays for video and PDF
	const documentationLinks = additionalMaterials ? additionalMaterials.split(',') : [];

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.project_detail}>
					<div className={classes.project_detail_img_block}>
						<img src={image} alt={title} className={classes.project_image} />
						<div className={classes.project_detail_img_block_text}>
							<h3>{title}</h3>
							<p>
								<strong>Категория:</strong> {category}
							</p>
						</div>
					</div>
					<p>{description}</p>

					<div className={classes.project_detail_tasks}>
						<h3>Задания/ТЗ</h3>
						{tasks != null ? (
							<ul>{tasks.map((task, index) => <li key={index}>{task}</li>)}</ul>
						) : (
							<p>Нет доступного ТЗ</p>
						)}
					</div>

					<div className={classes.additional_materials}>
						<h3>Документация</h3>
						<div className={classes.additional_materials_block}>
							{documentationLinks.length > 0 ? (
								<div className={classes.additional_materials_item_wrapper}>
									{documentationLinks.map((doc, index) => (
										<div className={classes.additional_materials_item} key={index}>
											<img src={'/public/Document_icon.png'} alt={''} className="course-image" />
											<a href={`${doc}`} target="_blank" rel="noopener noreferrer">
												Документ {index + 1}
											</a>
										</div>
									))}
								</div>
							) : (
								<p>Документация не доступна.</p>
							)}
						</div>
					</div>

					<div className={classes.project_detail_comments_block}>
						<h3>Комментарии</h3>
						<div className={classes.project_detail_add_comments}>
							<textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Напишите комментарий..." />
							<button onClick={handleAddComment}>Добавить комментарий</button>
						</div>
						<div className={classes.project_detail_comments}>
							{comments.map((comment, index) => (
								<Comment key={index} author={comment.author} content={comment.content} />
							))}
						</div>
					</div>

					<button className={classes.backButton} onClick={handleBack}>
						Назад к списку
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;
