import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../services/ApiServ.js';
import classes from '../styles/CoursesList.module.css'; // Import CSS module

const TeacherCourseList = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await getAllCourses();
				if (response && response.data) {
					const formattedCourses = response.data.map((course) => ({
						id: course.id,
						title: course.title || 'Без названия',
						description: course.description || 'Описание отсутствует',
						duration: '10 часов', // Дефолтная длительность, если не указано
						category: 'Programming', // Дефолтная категория, если не указано
						instructor: course.teacherName || 'Преподаватель неизвестен',
						instructorImage: '/images/default-teacher.jpg', // Дефолтное изображение
						videos: course.videoUrl ? [course.videoUrl] : [],
						documentation: course.documentationUrl ? [course.documentationUrl] : [],
						image: course.description, // Описание как альтернативный текст изображения
					}));
					setCourses(formattedCourses);
				}
			} catch (error) {
				console.error('Ошибка загрузки курсов:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	if (loading) {
		return <p>Загрузка курсов...</p>;
	}

	return (
		<div>
			<div className={classes.container}>
				<div className={classes.course_list}>
					{/* <h2>Мои курсы</h2> */}
					<div style={{margin: '0'}} className={classes.course_cards}>
						{courses.length > 0 ? (
							courses.map((course) => (
								<Link to={`/course/${course.id}`} key={course.id}>
									<CourseCard course={course} />
								</Link>
							))
						) : (
							<p>Курсы отсутствуют</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherCourseList;
