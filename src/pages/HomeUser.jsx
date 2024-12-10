import React, { useState } from 'react';
import { register } from '../services/ApiServ'; 
import StatisticsChart from '../components/StatisticsUserHome';

import classes from '../styles/HomeUser.module.css';

import { NavLink } from 'react-router-dom';


const HomeUser = () => {
  

  return (
    <div className={classes.main}>
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
    </div>
  );
};

export default HomeUser;
