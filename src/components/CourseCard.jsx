import { Link } from 'react-router-dom';
import classes from '../styles/CoursesCard.module.css';

const CourseCard = ({ course, onStartCourse, showProgress }) => {
	// Преобразуем прогресс в диапазон от 0 до 1
	const progressValue = course.progress >= 0 ? Math.min(course.progress, 1) : 0;

	return (
		<div className={classes.course_card}>
			<img src={course.image} alt={course.title} className="course-image" />
			<h3 className="course-title">{course.title}</h3>
			<p className="course-description">{course.description}</p>
			<p className="course-duration">Время на прохождение: {course.duration}</p>
			{showProgress && (
				<div className="progress-container">
					<label htmlFor={`progress-${course.id}`} className="progress-label">
						Прогресс:
					</label>
					<progress
						id={`progress-${course.id}`}
						className="progress-bar"
						value={progressValue * 100} // значение в процентах
						max="100"
					/>
					<span className="progress-text">{Math.round(progressValue * 100)}%</span>
				</div>
			)}
			<Link to={`/course/${course.id}`} key={course.id}>
				<button onClick={() => onStartCourse(course)} className="start-button">
					Пройти
				</button>
			</Link>
		</div>
	);
};

export default CourseCard;
