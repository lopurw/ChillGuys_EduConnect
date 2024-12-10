import React, { useState } from 'react';
import { register } from '../services/ApiServ'; 
import StatisticsChart from '../components/StatisticsUserHome';
import { NavLink } from 'react-router-dom';

const HomeUser = () => {
  

  return (
    <>
    <h1>Начинай обучение уже сейчас!</h1>
    <NavLink
          to="/coursesuser" 
          className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
        >
          <button>Поиск курсов</button>
        </NavLink>
    <button>Вакансии</button>
    <button>Проекты</button>
    <button>Мои курсы</button>
    <StatisticsChart></StatisticsChart>
    </>
  );
};

export default HomeUser;
