import React, { useState, useEffect } from 'react';
import { fetchCourseStats } from '../services/ApiServ';
import StatisticsChart from '../components/StatisticsUserHome';

import classes from '../styles/HomeUser.module.css';
import { NavLink } from 'react-router-dom';

const HomeUser = () => {
	const [courseStats, setCourseStats] = useState({ completedCourses: 0, notCompletedCourses: 0 });
	const [loading, setLoading] = useState(true);

	// Fetch course stats on component mount
	useEffect(() => {
		const getStats = async () => {
			try {
				const stats = await fetchCourseStats();
				setCourseStats(stats);
			} catch (error) {
				console.error('Error fetching course stats:', error);
			} finally {
				setLoading(false);
			}
		};

		getStats();
	}, []);

	return (
		<div className={classes.main}>
			<h1>Начинай обучение уже сейчас!</h1>
			<div className={classes.buttons_container}>
				<NavLink to="/coursesuser" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
					<button className={classes.button}>
						<img src="/public/search.png" alt="" /> Поиск курсов
					</button>
				</NavLink>
				<button className={classes.button}>
					<img src="/public/vacancy.png" alt="" />
					Вакансии
				</button>
				<NavLink to="/projectuser" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
					<button className={classes.button}>
						<img src="/public/project.png" alt="" /> Проекты
					</button>
				</NavLink>
				<NavLink to="/mycourses" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
					<button className={classes.button}>
						<img src="/public/courses.png" alt="" /> Мои курсы
					</button>
				</NavLink>
			</div>

			<div className={classes.statsContainer}>
				<h2>Статистика курсов</h2>
				{loading ? (
					<p>Загрузка статистики...</p>
				) : (
					<div className={classes.stats}>
						<p>
							Завершенные курсы: <strong>{courseStats.completedCourses}</strong>
						</p>
						<p>
							Незавершенные курсы: <strong>{courseStats.notCompletedCourses}</strong>
						</p>
					</div>
				)}
			</div>

			<StatisticsChart completed={courseStats.completedCourses} notCompleted={courseStats.notCompletedCourses} />
		</div>
	);
};

export default HomeUser;
