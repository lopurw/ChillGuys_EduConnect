import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import { getAllCourses } from "../services/ApiServ.js";

const CourseList = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
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
            duration: '10 часов', // Можно заменить на значение из API, если оно доступно
            category: 'Programming', // Замените на правильное поле из API, если оно доступно
            instructor: course.teacherName || 'Преподаватель неизвестен',
            instructorImage: '/images/default-teacher.jpg', // Заменить на URL из API, если есть
            videos: course.videoUrl ? [course.videoUrl] : [],
            documentation: course.documentationUrl ? [course.documentationUrl] : [],
            image: 'https://via.placeholder.com/150', // Можно заменить на реальное поле из API
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
      const matchesCategory =
          categoryFilter ? course.category === categoryFilter : true;
      const matchesDuration =
          durationFilter ? course.duration === durationFilter : true;

      return matchesCategory && matchesDuration;
    });
    setFilteredCourses(filtered);
  };

  const displayedCourses = filteredCourses.length > 0 ? filteredCourses : courses;

  if (loading) {
    return <p>Загрузка курсов...</p>;
  }

  return (
      <div className="course-list">
        <div className="filters">
          <div>
            <label>Категория:</label>
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Все</option>
              <option value="Frontend">Frontend</option>
              <option value="Programming">Programming</option>
            </select>
          </div>

          <div>
            <label>Время на прохождение:</label>
            <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
            >
              <option value="">Все</option>
              <option value="10 часов">10 часов</option>
              <option value="15 часов">15 часов</option>
              <option value="8 часов">8 часов</option>
            </select>
          </div>

          <button onClick={handleFilter}>Найти</button>
        </div>

        <div className="course-cards">
          {displayedCourses.length > 0 ? (
              displayedCourses.map((course) => (
                  <Link to={`/course/${course.id}`} key={course.id}>
                    <CourseCard course={course} />
                  </Link>
              ))
          ) : (
              <p>Совпадений не найдено</p>
          )}
        </div>
      </div>
  );
};

export default CourseList;
