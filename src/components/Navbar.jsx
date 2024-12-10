import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../styles/Navbar.module.css';

const Navbar = () => {
  const [role, setRole] = useState('Студент');

  return (
      <nav>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.nav_wrapper}>
              {role === 'Студент' ? (
                  <div>
                    <NavLink
                        to="/homeuser"
                        className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
                    >
                      EduConnect
                    </NavLink>
                  </div>
              ) : (
                  <div>
                    <NavLink
                        to="/home"
                        className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
                    >
                      Главная
                    </NavLink>
                  </div>
              )}
            <div className={classes.side_buttons}>
              <div className={classes.side_button}>
                <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
                >
                  Вход
                </NavLink>
              </div>
              <div className={classes.side_button}>
                <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
                >
                  Регистрация
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      </nav>

  );
};

export default Navbar;