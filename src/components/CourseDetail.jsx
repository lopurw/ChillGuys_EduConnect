import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import image from '../assets/png-clipart-businessperson-african-american-black-graphy-chief-executive-man-miscellaneous-photography-thumbnail.png';
import { getCourseById, completeLesson } from '../services/ApiServ.js';
import classes from '../styles/CoursesDetail.module.css';

const CourseDetail = () => {

	const { id } = useParams();
	const navigate = useNavigate();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [newLesson, setNewLesson] = useState({
		title: '',
		content: '',
		resources: '',
	});

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await getCourseById(id);
				setCourse(response.data);
			} catch (error) {
				console.error('Error fetching course:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourse();
	}, [id]);

	const handleBack = () => {
		navigate('/');
	};

	const handleCompleteLesson = async (lessonId) => {
		try {
			const studentId = localStorage.getItem('userId');
			if (!studentId) throw new Error('Student ID is missing.');

			const response = await completeLesson({ studentId, lessonId });
			window.location.reload();
			if (response.status === 200) {
				alert('Lesson marked as completed!');

				setCourse((prev) => ({
					...prev,
					lessons: prev.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson)),
				}));
			} else {
				console.error('Failed to complete lesson:', response);
			}
		} catch (error) {
			console.error('Error completing lesson:', error);
		}
	};

	const handleJoinCourse = async () => {
		try {
			const studentId = localStorage.getItem('userId');
			if (!studentId) {
				alert('Student ID is missing.');
				return;
			}

			const response = await fetch('http://localhost:5220/api/Course/Join', {
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					studentId,
					courseId: id,
				}),
			});

			if (response.ok) {
				alert('Вы успешно вступили в курс!');
				setCourse((prev) => ({
					...prev,
					isJoined: true,
				}));
			} else {
				console.error('Failed to join the course:', response);
				alert('Не удалось вступить в курс. Пожалуйста, попробуйте снова.');
			}
		} catch (error) {
			console.error('Error joining course:', error);
		}
	};

	// Function to handle lesson form submission
	const handleAddLesson = async (event) => {
		event.preventDefault();

		try {
			const studentId = localStorage.getItem('userId');
			if (!studentId) {
				alert('Student ID is missing.');
				return;
			}

			const resourcesArray = newLesson.resources.split(',');

			const response = await fetch('http://localhost:5220/api/Course/addLesson', {
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					courseId: id,
					title: newLesson.title,
					content: newLesson.content,
					resources: resourcesArray,
				}),
			});

			if (response.ok) {
				alert('Задание добавлено!');
				setNewLesson({ title: '', content: '', resources: '' });

				// Reload the course to include the new lesson
				const updatedCourseResponse = await getCourseById(id);
				setCourse(updatedCourseResponse.data);
			} else {
				console.error('Failed to add lesson:', response);
				alert('Не удалось добавить задание. Пожалуйста, попробуйте снова.');
			}
		} catch (error) {
			console.error('Error adding lesson:', error);
		}
	};

	if (loading) {
		return <p>Загрузка данных курса...</p>;
	}

	if (!course) {
		return <p>Курс не найден</p>;
	}

	const { title, description, teacherName, lessons, createdAt, updatedAt, videoUrl, documentationUrl } = course;

	const videoLinks = videoUrl ? videoUrl.split(',') : [];
	const documentationLinks = documentationUrl ? documentationUrl.split(',') : [];

	return (
		<div className={classes.wrapper}>
			<div className={classes.container}>
				<div className={classes.course_detail}>
					<h2>{title}</h2>
					<div className={classes.course_detail_header}>
						<div className={classes.course_detail_header_item}>
							<img src={image} alt={title} className={classes.course_image} />
							<div className={classes.course_detail_header_item_text}>
								<p>{description}</p>
								<p>
									<strong>Дата создания:</strong> {new Date(createdAt).toLocaleDateString()}
								</p>
								<p>
									<strong>Последнее обновление:</strong> {new Date(updatedAt).toLocaleDateString()}
								</p>
							</div>
						</div>
						<div className={classes.course_detail_header_item}>
							<img src={image} alt={title} className={classes.course_image} />
							<div className={classes.course_detail_header_item_text}>
								<p>
									<strong>Преподаватель:</strong> {teacherName}
								</p>
							</div>
						</div>
					</div>

					<div className={classes.video_block}>
						<h3>Видео с курса</h3>
						<div className={classes.video_list}>
							{videoLinks.length > 0 ? (
								videoLinks.map((video, index) => (
									<video key={index} controls width="600">
										<source src={`${video}`} type="video/mp4" />
										Ваш браузер не поддерживает видео.
									</video>
								))
							) : (
								<p>Видео не доступны.</p>
							)}
						</div>
						<button>Просмотреть все видео</button>
					</div>

					<div className={classes.documentation_block}>
						<h3>Документация</h3>
						<ul>
							{documentationLinks.length > 0 ? (
								documentationLinks.map((doc, index) => (
									<li key={index}>
										<a href={`${doc}`} target="_blank" rel="noopener noreferrer">
											Документ {index + 1}
										</a>
									</li>
								))
							) : (
								<p>Документация не доступна.</p>
							)}
						</ul>
					</div>

					<div className={classes.lesson_block}>
						<h3>Задания</h3>
						<ul>
							{lessons.map((lesson) => (
								<li key={lesson.id}>
									{lesson.title}
									{lesson.isCompleted ? <span> (Завершен)</span> : <button onClick={() => handleCompleteLesson(lesson.id)}>Завершить</button>}
								</li>
							))}
						</ul>
					</div>

					{/* Add Lesson Form */}
					<div className={classes.add_lesson_form}>
						<h3>Добавить задание</h3>
						<form onSubmit={handleAddLesson}>
							<div>
								<label>Название задания</label>
								<input type="text" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} required />
							</div>
							<div>
								<label>Содержание задания</label>
								<textarea value={newLesson.content} onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })} required />
							</div>
							<div>
								<label>Ресурсы (через запятую)</label>
								<input type="text" value={newLesson.resources} onChange={(e) => setNewLesson({ ...newLesson, resources: e.target.value })} />
							</div>
							<button type="submit">Добавить задание</button>
						</form>
					</div>

					<button onClick={handleJoinCourse}>Вступить</button>
				</div>
			</div>
		</div>
	);

};

export default CourseDetail;
