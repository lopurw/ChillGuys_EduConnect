import React from 'react';
import { Link } from 'react-router-dom';
import TeacherCourseList from '../components/TeacherCourseList';
import AddCourse from '../components/AddCourse';
import classes from '../styles/HomeUser.module.css';

const HomeTeacher = () => {
	return (
		<div className={classes.main}>
			<h1>Мои курсы</h1>
			<TeacherCourseList />
			<AddCourse />
		</div>
	);
};

export default HomeTeacher;
