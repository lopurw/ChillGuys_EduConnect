import React from 'react';
import VacancyCard from './VacancyCard';
import classes from '../styles/VacancyList.module.css';

const VacancyList = ({ vacancies }) => {
	return <div className={classes.main}>{vacancies.length > 0 ? vacancies.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />) : <p>No vacancies available.</p>}</div>;
};

export default VacancyList;
