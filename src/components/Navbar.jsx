import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.module.css';

const Navbar = () => {
  const [role, setRole] = useState('');

  

  return (
    <nav>
      <ul>
        
        {role === 'Студент' ? (
          <li>
            <NavLink
              to="/homeuser"
              className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
            >
               EduConnect1
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
            >
              Home
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
          >
            Вход
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
          >
            Регистрация
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
