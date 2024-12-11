import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classes from '../styles/Navbar.module.css';

const Navbar = () => {
	const navigate = useNavigate();
	const userRole = localStorage.getItem('userRole');
	const isAuthenticated = Boolean(localStorage.getItem('token'));

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userRole');
		window.location.reload();
		navigate('/login');
	};

	return (
		<nav>
			<div className={classes.wrapper}>
				<div className={classes.container}>
					<div className={classes.nav_wrapper}>
						{userRole === 'StudentProfile' ? (
							<div>
								<NavLink to="/homeuser" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
									EduConnect
								</NavLink>
							</div>
						) : userRole === 'ManagerProfile' ? (
							<div>
								<NavLink to="/homeemployer" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
									EduConnect
								</NavLink>
							</div>
						) : userRole === 'TeacherProfile' ? (
							<div>
								<NavLink to="/hometeacher" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
									EduConnect
								</NavLink>
							</div>
						) : (
							<div>
								<NavLink to="/home" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
									Главная
								</NavLink>
							</div>
						)}
						<div className={classes.side_buttons}>
							{!isAuthenticated ? (
								<>
									<div className={classes.side_button}>
										<NavLink to="/login" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
											Вход
										</NavLink>
									</div>
									<div className={classes.side_button}>
										<NavLink to="/register" className={({ isActive }) => (isActive ? 'activeLink' : 'link')}>
											Регистрация
										</NavLink>
									</div>
								</>
							) : (
								<div className={classes.side_button}>
									<NavLink to="/myprofile" className={classes.profile_link}>
										<img src={'src/assets/react.svg'} alt="User Avatar" className={classes.avatar} />
										<span className={classes.user_name}>{localStorage.getItem('userName')}</span>
									</NavLink>
									<button onClick={handleLogout} className={classes.logout_button}>
										Выход
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
