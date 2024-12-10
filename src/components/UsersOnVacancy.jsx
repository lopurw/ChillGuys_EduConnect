import React from 'react';
import classes from '../styles/UsersOnVacancy.module.css';

const UsersOnVacancy = ({ user }) => {
	const handleAccept = () => {
		alert(`Accepted application from ${user.name}`);
	};

	const handleReject = () => {
		alert(`Rejected application from ${user.name}`);
	};

	return (
		<div className={classes.card}>
			<p>
				<strong>Имя:</strong> {user.name}
			</p>
			<p>
				<strong>Почта:</strong> {user.email}
			</p>
			<div>
				<button onClick={handleAccept} className={classes.buttonAccept}>
					Принять
				</button>
				<button onClick={handleReject} className={classes.buttonReject}>
					Отклонить
				</button>
			</div>
		</div>
	);
};

export default UsersOnVacancy;
