import React, { useState } from 'react';
import classes from '../styles/AddVacancy.module.css';

const AddVacancy = () => {
	const [vacancy, setVacancy] = useState({
		title: '',
		description: '',
		location: '',
		salary: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVacancy({
			...vacancy,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Vacancy added:', vacancy);
		setVacancy({
			title: '',
			description: '',
			location: '',
			salary: '',
		});
	};

	return (
		<div className={classes.container}>
			<h1>Добавить новую вакансию</h1>
			<form onSubmit={handleSubmit} className={classes.form}>
				<input type="text" name="title" value={vacancy.title} onChange={handleChange} placeholder="Название" required className={classes.input} />
				<textarea name="description" value={vacancy.description} onChange={handleChange} placeholder="Описание" required className={classes.input} />
				<input type="text" name="location" value={vacancy.location} onChange={handleChange} placeholder="Расположение" required className={classes.input} />
				<input type="number" name="salary" value={vacancy.salary} onChange={handleChange} placeholder="Зарплата" required className={classes.input} />
				<button type="submit" className={classes.button}>
					Добавить вакансию
				</button>
			</form>
		</div>
	);
};

export default AddVacancy;
