import React, { useState } from 'react';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom'; 
import CourseDetail from './CourseDetail';

const CourseList = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const courses = [
   
        {
          id: 1,
          title: 'Курс по React',
          description: 'Изучите основы React и создание приложений.',
          duration: '10 часов',
          category: 'Frontend',
          instructor: 'Иван Иванов',
          instructorImage: '/images/ivan.jpg', 
          videos: [
            '/videos/react-video1.mp4',
            '/videos/react-video2.mp4',
            '/videos/react-video3.mp4'
          ],
          documentation: [
            '/docs/react-docs.pdf',
            '/docs/react-presentation.pptx'
          ],
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          title: 'Курс по JavaScript',
          description: 'Погрузитесь в мир JavaScript и его возможностей.',
          duration: '15 часов',
          category: 'Programming',
          instructor: 'Мария Петрова',
          instructorImage: '/images/maria.jpg', 
          videos: [
            '/videos/js-video1.mp4',
            '/videos/js-video2.mp4',
            '/videos/js-video3.mp4'
          ],
          documentation: [
            '/docs/js-docs.pdf',
            '/docs/js-presentation.pptx'
          ],
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          title: 'Курс по CSS',
          description: 'Разработайте навыки работы с CSS и дизайном веб-страниц.',
          duration: '8 часов',
          category: 'Frontend',
          instructor: 'Сергей Сидоров',
          instructorImage: '/images/sergey.jpg', 
          videos: [
            '/videos/css-video1.mp4',
            '/videos/css-video2.mp4',
            '/videos/css-video3.mp4'
          ],
          documentation: [
            '/docs/css-docs.pdf',
            '/docs/css-presentation.pptx'
          ],
          image: 'https://via.placeholder.com/150',
        }
      ];
      



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
