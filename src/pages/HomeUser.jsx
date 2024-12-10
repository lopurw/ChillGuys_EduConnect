import React, { useState } from 'react';
import { register } from '../services/ApiServ'; 
import StatisticsChart from '../components/StatisticsUserHome';
const HomeUser = () => {
  

  return (
    <>
    <h1>Начинай обучение уже сейчас!</h1>
    <button>Поиск курсов</button>
    <button>Вакансии</button>
    <button>Проекты</button>
    <button>Мои курсы</button>
    <StatisticsChart></StatisticsChart>
    </>
  );
};

export default HomeUser;
