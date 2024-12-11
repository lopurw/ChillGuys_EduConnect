import React from 'react';
import { useParams, Link } from 'react-router-dom';
import UsersListOnVacancy from '../components/UsersListOnVacancy';
import classes from '../styles/VacancyDetail.module.css';

const VacancyDetail = () => {
	const { id } = useParams();

	const vacancy = {
		id: 1,
		title: 'Frontend Developer',
		description: 'Develop and maintain user interfaces.',
		location: 'New York',
		salary: 5000,
		requirements: 'Experience with React, JavaScript, and CSS.',
		benefits: 'Health insurance, remote work options.',
	};

	const applicants = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
	];

	return (
		<div className={classes.container}>
			<h1 className={classes.h1}>{vacancy.title}</h1>
			<p>
				<strong>Описание:</strong> {vacancy.description}
			</p>
			<p>
				<strong>Расположение:</strong> {vacancy.location}
			</p>
			<p>
				<strong>Зарплата:</strong> {vacancy.salary}
			</p>
			<p>
				<strong>Навыки:</strong> {vacancy.requirements}
			</p>
			<p>
				<strong>Наши бенефиты:</strong> {vacancy.benefits}
			</p>
			<Link to={`/vacancy/edit/${vacancy.id}`} className={classes.link}>
				<button className={classes.button}>Изменить</button>
			</Link>
			<UsersListOnVacancy users={applicants} />
		</div>
	);
};

export default VacancyDetail;
