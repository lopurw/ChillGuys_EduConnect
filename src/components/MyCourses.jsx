import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { getAllStudentCourses } from '../services/ApiServ.js'; // Assuming this service is already set up
import classes from '../styles/MyCourses.module.css'; // Assuming you're using CSS Modules

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
					const formattedCourses = response.data.map((course) => ({
						id: course.id,
						title: course.title || 'Без названия',
						description: course.description || 'Описание отсутствует',
						duration: course.duration || '10 часов', // Replace with actual value if available
						category: course.category || 'Programming', // Replace with actual category if available
						progress: course.score / course.totalLessons || 0, // Assuming the API provides progress value
						image: course.image || 'https://via.placeholder.com/150', // Replace with actual image if available
					}));
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
		  {courses.map((course) => (
			<CourseCard
			  key={course.id}
			  course={course}
			  onStartCourse={handleStartCourse}
			  showProgress={true}
			/>
		  ))}
		</div>
	  );
};

export default MyCourses;
