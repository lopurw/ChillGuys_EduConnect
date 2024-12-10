import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [role, setRole] = useState('Студент');

  

  return (
    <nav className="navbar">
      <ul className="navList">
        
        {role === 'Студент' ? (
          <li className="navItem">
            <NavLink
              to="/homeuser"
              className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
            >
               EduConnect1
            </NavLink>
          </li>
        ) : (
          <li className="navItem">
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
            >
              Home
            </NavLink>
          </li>
        )}
        <li className="navItem">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
          >
            Вход
          </NavLink>
        </li>
        <li className="navItem">
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
