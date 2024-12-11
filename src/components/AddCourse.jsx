import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/HomeUser.module.css';

const AddCourse = () => {
	return (
		<div className={classes.addCourseWrapper}>
			<Link to="/addcourse">
				<button className={classes.addButton}>+</button>
			</Link>
		</div>
	);
};

export default AddCourse;
