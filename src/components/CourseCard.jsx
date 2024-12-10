

const CourseCard = ({ course, onStartCourse }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <h3 className="course-title">{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <p className="course-duration">Время на прохождение: {course.duration}</p>
      <button onClick={() => onStartCourse(course)} className="start-button">
        Пройти
      </button>
    </div>
  );
};

export default CourseCard;
