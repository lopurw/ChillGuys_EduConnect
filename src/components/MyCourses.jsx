import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { getAllStudentCourses } from '../services/ApiServ.js'; // Assuming this service is already set up
import classes from '../styles/MyCourses.module.css';

const MyCourses = () => {
	const [courses, setCourses] = useState([]);
	const [filteredCourses, setFilteredCourses] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState('');
	const [durationFilter, setDurationFilter] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await getAllStudentCourses(localStorage.getItem('userId')); // Fetch data from API
				if (response && response.data) {
					const formattedCourses = response.data.map((course) => {
						const progress = course.score / course.totalLessons || 0; // Calculate progress
						// Log the score, totalLessons, and progress
						console.log(`Course ID: ${course.id}, Score: ${course.score}, Total Lessons: ${course.totalLessons}, Progress: ${progress}`);
						return {
							id: course.id,
							title: course.title || 'Без названия',
							description: course.description || 'Описание отсутствует',
							duration: course.duration || '10 часов', // Replace with actual value if available
							category: course.category || 'Programming', // Replace with actual category if available
							progress: progress, // Save the progress value
							image: course.image || 'https://via.placeholder.com/150', // Replace with actual image if available
						};
					});
					setCourses(formattedCourses);
					setFilteredCourses(formattedCourses);
				}
			} catch (error) {
				console.error('Ошибка загрузки курсов:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	const handleFilter = () => {
		const filtered = courses.filter((course) => {
			const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
			const matchesDuration = durationFilter ? course.duration === durationFilter : true;

			return matchesCategory && matchesDuration;
		});
		setFilteredCourses(filtered);
	};

	const handleStartCourse = (course) => {
		console.log(`Начинаем курс: ${course.title}`);
	};

	if (loading) {
		return <p>Загрузка курсов...</p>;
	}

	return (
		<div className={classes.my_courses_wrapper}>

			{courses.map((course) => {
				// Log the score, totalLessons, and progress for each course while rendering
				console.log(`Rendering Course: ${course.title}, Score: ${course.score}, Total Lessons: ${course.totalLessons}, Progress: ${course.progress}`);
				return <CourseCard key={course.id} course={course} onStartCourse={handleStartCourse} showProgress={true} />;
			})}

		</div>
	);
};

export default MyCourses;
