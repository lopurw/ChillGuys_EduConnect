import React from 'react';
import VacancyCard from './VacancyCard';
import classes from '../styles/VacancyList.module.css';

const VacancyList = () => {
	const vacancies = [
		{ id: 1, title: 'Frontend Developer', description: 'Develop UI', location: 'New York', salary: 5000 },
		{ id: 2, title: 'Backend Developer', description: 'Develop APIs', location: 'San Francisco', salary: 6000 },
	];

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.vacancy_list_wrapper}>
					<div className={classes.main}>{vacancies.length > 0 ? vacancies.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />) : <p>No vacancies available.</p>}</div>
				</div>
			</div>
		</div>

	)
};

export default VacancyList;
