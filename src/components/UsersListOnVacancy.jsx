import React from 'react';
import UsersOnVacancy from './UsersOnVacancy';
import classes from '../styles/UsersOnVacancy.module.css';

const UsersListOnVacancy = ({ users }) => {
	return (
		<div style={styles.container}>
			<h3 className={classes.h3}>Кандидаты</h3>
			{users.length > 0 ? users.map((user) => <UsersOnVacancy key={user.id} user={user} />) : <p>No applicants yet.</p>}
		</div>
	);
};

const styles = {
	container: {
		marginTop: '20px',
		border: '1px solid #ddd',
		padding: '10px',
		borderRadius: '8px',
	},
};

export default UsersListOnVacancy;
