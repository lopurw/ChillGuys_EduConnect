import { Link } from 'react-router-dom'; 
const CourseCard = ({ course, onStartCourse, showProgress }) => {
  return (
    <div className="course-card">
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
            value={course.progress * 100}
            max="100"
          />
          <span className="progress-text">{Math.round(course.progress * 100)}%</span>
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