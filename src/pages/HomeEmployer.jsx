// src/pages/HomeEmployer.js
import React from 'react';
import { Link } from 'react-router-dom';
import VacancyList from '../components/VacancyList';
import classes from '../styles/HomeUser.module.css';

const HomeEmployer = () => {
	const vacancies = [
		{ id: 1, title: 'Frontend Developer', description: 'Develop UI', location: 'New York', salary: 5000 },
		{ id: 2, title: 'Backend Developer', description: 'Develop APIs', location: 'San Francisco', salary: 6000 },
	];

	return (
		<div className={classes.main}>
			<h1>Мои вакансии</h1>
			<VacancyList vacancies={vacancies} />
			<Link to="/addvacancy">
				<button className={classes.addButton}>+</button>
			</Link>
		</div>
	);
};

export default HomeEmployer;
