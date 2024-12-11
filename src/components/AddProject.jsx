import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/AddProject.module.css';

const AddProject = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const projectData = {
			title,
			description,
		};

		try {
			await axios.post('http://localhost:5220/api/Project/addProject', projectData, {
				headers: {
					accept: '*/*',
					'Content-Type': 'application/json',
				},
			});
			// Redirect to the Project List after successful addition
			navigate('/projectuser');
		} catch (error) {
			console.error('Error adding project:', error);
		}
	};

	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Добавить проект</h1>
			<form onSubmit={handleSubmit} className={classes.form}>
				<div className={classes.inputGroup}>
					<label htmlFor="title">Название проекта</label>
					<input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>
				<div className={classes.inputGroup}>
					<label htmlFor="description">Описание проекта</label>
					<textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
				</div>
				<button type="submit" className={classes.button}>
					Добавить проект
				</button>
			</form>
		</div>
	);
};

export default AddProject;
