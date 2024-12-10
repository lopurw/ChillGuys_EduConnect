import React, { useState } from 'react';
import { register } from '../services/ApiServ';
import StatisticsChart from '../components/StatisticsUserHome';
import classes from '../styles/HomeUser.module.css';
const HomeUser = () => {
	return (
		<div className={classes.main}>
			<h1>Начинай обучение уже сейчас!</h1>
			<div className={classes.buttons_container}>
				<button className={classes.button}>
					{' '}
					<img src="/public/search.png" alt="" /> Поиск курсов
				</button>
				<button className={classes.button}>
					{' '}
					<img src="/public/vacancy.png" alt="" />
					Вакансии
				</button>
				<button className={classes.button}>
					{' '}
					<img src="/public/project.png" alt="" /> Проекты
				</button>
				<button className={classes.button}>
					{' '}
					<img src="/public/courses.png" alt="" /> Мои курсы
				</button>
			</div>
			<StatisticsChart></StatisticsChart>
		</div>
	);
};

export default HomeUser;
