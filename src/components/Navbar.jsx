import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../styles/Navbar.module.css';

const Navbar = () => {
  const [role, setRole] = useState('Студент');
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [user, setUser] = useState({
    name: 'Иван Иванов',
    avatar: 'public/images.jpg', 
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); 
	setRole('');
  };

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
              {isLoggedIn ? (
                <div className={classes.logged_in}>
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className={classes.avatar}
                  />
                  <span className={classes.user_name}>{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className={classes.logout_button}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
