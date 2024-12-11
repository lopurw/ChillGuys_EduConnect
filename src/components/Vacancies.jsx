import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import VacancyList from './VacancyList';
import AddVacancy from './AddVacancy';

const Vacancies = () => {
	const [vacancies, setVacancies] = useState([]);

	const addVacancy = (vacancy) => {
		setVacancies([...vacancies, vacancy]);
	};

	return (
		<div>
			<h1>Мои вакансии</h1>

			<AddVacancy addVacancy={addVacancy} />

			<NavLink to="/vacancies/add" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
				<button>Добавить вакансию</button>
			</NavLink>

			{vacancies.length === 0 ? <p>Пока нет вакансий.</p> : <VacancyList vacancies={vacancies} />}
		</div>
	);
};

export default Vacancies;
