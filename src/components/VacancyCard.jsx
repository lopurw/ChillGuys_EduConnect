import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/VacancyCard.module.css';

const VacancyCard = ({ vacancy }) => {
	return (
		<>
			<Link to={`/vacancy/${vacancy.id}`} className={classes.link}>
				<div className={classes.card}>
					<h3 className={classes.h3}>{vacancy.title}</h3>
					<p>
						<strong>Описание: </strong> {vacancy.description}
					</p>
					<p>
						<strong>Расположение:</strong> {vacancy.location}
					</p>
					<p>
						<strong>Зарплата:</strong> {vacancy.salary}
					</p>
				</div>
			</Link>
		</>
	);
};

export default VacancyCard;
