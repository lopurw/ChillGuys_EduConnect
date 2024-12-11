// src/pages/EditVacancy.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from "../styles/CoursesList.module.css";

const EditVacancy = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// Placeholder vacancy data
	const [vacancy, setVacancy] = useState({
		title: 'Frontend Developer',
		description: 'Develop and maintain user interfaces.',
		location: 'Минск',
		salary: 5000,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVacancy({ ...vacancy, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Simulate a successful update
		alert('Vacancy updated successfully! Returning to vacancy details.');
		navigate(`/vacancy/${id}`);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.course_add_wrapper}>
					<div className={classes.course_add_card}>
						<h1>Изменить данные</h1>
						<form onSubmit={handleSubmit}>
							<input type="text" name="title" value={vacancy.title} onChange={handleChange} placeholder="Title" required />
							<textarea name="description" value={vacancy.description} onChange={handleChange} placeholder="Description" required />
							<input type="text" name="location" value={vacancy.location} onChange={handleChange} placeholder="Location" required />
							<input type="number" name="salary" value={vacancy.salary} onChange={handleChange} placeholder="Salary" required />
							<button type="submit">
								Сохранить
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditVacancy;
