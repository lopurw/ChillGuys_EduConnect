import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import img from './images.jpg'
import image from '../assets/png-clipart-businessperson-african-american-black-graphy-chief-executive-man-miscellaneous-photography-thumbnail.png'

const CourseDetail = () => {
  const { id } = useParams(); 
  const history = useNavigate();
  const courses = [
   
    {
      id: 1,
      title: 'Курс по React',
      description: 'Изучите основы React и создание приложений.',
      duration: '10 часов',
      category: 'Frontend',
      instructor: 'Иван Иванов',
      instructorImage: './images.jpg', 
      videos: [
        '/public/sample-5s.mp4',
        '/public/sample-5s.mp4',
        '/public/sample-5s.mp4'
      ],
      documentation: [
        '/public/f2.pdf',
        '/public/p2.pptx'
      ],
      image: '/public/images.jpg',
    },
    {
      id: 2,
      title: 'Курс по JavaScript',
      description: 'Погрузитесь в мир JavaScript и его возможностей.',
      duration: '15 часов',
      category: 'Programming',
      instructor: 'Мария Петрова',
      instructorImage: '/public/images.jpg', 
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
      instructorImage: '/public/sergey.jpg', 
      videos: [
        '/public/css-video1.mp4',
        '/public/css-video2.mp4',
        '/public/css-video3.mp4'
      ],
      documentation: [
        '/public/css-docs.pdf',
        '/public/css-presentation.pptx'
      ],
      image: 'https://via.placeholder.com/150',
    }
  ];
  const course = courses.find(course => course.id === parseInt(id));  

  if (!course) {
    return <p>Курс не найден</p>;
  }

  const { title, description, duration, instructor, instructorImage, videos, documentation, image } = course;

  const handleBack = () => {
    history.push('/');  
  };

  return (
    <div className="course-detail">
        
        <img src={image} alt={title} className="course-image" />

      <h2>{title}</h2>
      <p>{description}</p>
      <p><strong>Время на прохождение:</strong> {duration}</p>
      <p><strong>Преподаватель:</strong> {instructor}</p>
      <img src={instructorImage} alt={instructor} className="instructor-image" />
      
      <h3>Видео с курса</h3>
      <div className="video-list">
        {videos.slice(0, 3).map((video, index) => (
          <video key={index} controls>
            <source src={video} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        ))}
      </div>
      <button>Просмотреть все видео</button> {/* Кнопка для просмотра всех видео */}

      <h3>Документация</h3>
      <ul>
        {documentation.map((doc, index) => (
          <li key={index}>
            <a href={doc} target="_blank" rel="noopener noreferrer">Документ {index + 1}</a>
          </li>
        ))}
      </ul>

      <button onClick={handleBack}>Назад к списку</button>
     
    </div>
  );
};

export default CourseDetail;
