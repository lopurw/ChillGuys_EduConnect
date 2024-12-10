// src/pages/EditVacancy.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditVacancy = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// Placeholder vacancy data
	const [vacancy, setVacancy] = useState({
		title: 'Frontend Developer',
		description: 'Develop and maintain user interfaces.',
		location: 'New York',
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
		<div style={styles.container}>
			<h1>Edit Vacancy (ID: {id})</h1>
			<form onSubmit={handleSubmit} style={styles.form}>
				<input type="text" name="title" value={vacancy.title} onChange={handleChange} placeholder="Title" required style={styles.input} />
				<textarea name="description" value={vacancy.description} onChange={handleChange} placeholder="Description" required style={styles.input} />
				<input type="text" name="location" value={vacancy.location} onChange={handleChange} placeholder="Location" required style={styles.input} />
				<input type="number" name="salary" value={vacancy.salary} onChange={handleChange} placeholder="Salary" required style={styles.input} />
				<button type="submit" style={styles.button}>
					Update Vacancy
				</button>
			</form>
		</div>
	);
};

const styles = {
	container: {
		maxWidth: '600px',
		margin: '50px auto',
		padding: '20px',
		border: '1px solid #ddd',
		borderRadius: '8px',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	input: {
		marginBottom: '10px',
		padding: '10px',
		borderRadius: '5px',
		border: '1px solid #ddd',
	},
	button: {
		padding: '10px 20px',
		backgroundColor: '#4CAF50',
		color: 'white',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
	},
};

export default EditVacancy;
