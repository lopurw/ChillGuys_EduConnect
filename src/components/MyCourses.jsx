import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { getAllStudentCourses } from "../services/ApiServ.js"; // Assuming this service is already set up

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
      const matchesCategory =
          categoryFilter ? course.category === categoryFilter : true;
      const matchesDuration =
          durationFilter ? course.duration === durationFilter : true;

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
      <div className="my-courses">
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
              <option value="20 часов">20 часов</option>
            </select>
          </div>

          <button onClick={handleFilter}>Найти</button>
        </div>

        <div className="course-cards">
          {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                  <CourseCard
                      key={course.id}
                      course={course}
                      onStartCourse={handleStartCourse}
                      showProgress={true}
                  />
              ))
          ) : (
              <p>Совпадений не найдено</p>
          )}
        </div>
      </div>
  );
};

export default MyCourses;
