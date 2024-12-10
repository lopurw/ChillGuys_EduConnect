import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import image from '../assets/png-clipart-businessperson-african-american-black-graphy-chief-executive-man-miscellaneous-photography-thumbnail.png';
import { getCourseById, completeLesson } from "../services/ApiServ.js";

const CourseDetail = () => {
    const { id } = useParams(); // Get course ID from URL
    const navigate = useNavigate(); // Navigation hook for "back" button
    const [course, setCourse] = useState(null); // State for course data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch course details on component mount
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(id); // Fetch course by ID
                setCourse(response.data); // Set course data
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchCourse();
    }, [id]); // Dependency on 'id' so it runs whenever 'id' changes

    // Handle "back" button click
    const handleBack = () => {
        navigate('/');  // Navigate back to the homepage
    };

    // Function to mark a lesson as completed
    const handleCompleteLesson = async (lessonId) => {
        try {
            const studentId = localStorage.getItem('userId'); // Retrieve the student ID from localStorage
            if (!studentId) throw new Error("Student ID is missing.");

            const response = await completeLesson({ studentId, lessonId }); // Call the API to mark the lesson as completed
            window.location.reload();
            if (response.status === 200) {
                alert('Lesson marked as completed!');
                // Optionally, update the local state to reflect the change
                setCourse((prev) => ({
                    ...prev,
                    lessons: prev.lessons.map((lesson) =>
                        lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
                    ),
                }));

            } else {
                console.error('Failed to complete lesson:', response);
            }
        } catch (error) {
            console.error('Error completing lesson:', error);
        }
    };

    if (loading) {
        return <p>Загрузка данных курса...</p>; // Show loading message
    }

    if (!course) {
        return <p>Курс не найден</p>; // Show error if no course is found
    }

    // Destructure course data
    const { title, description, teacherName, lessons, createdAt, updatedAt, videoUrl, documentationUrl } = course;

    // Assuming videoUrl and documentationUrl are directories or paths to content in the public folder
    const videoLinks = videoUrl ? videoUrl.split(',') : [];
    const documentationLinks = documentationUrl ? documentationUrl.split(',') : [];

    return (
        <div className="course-detail">
            {/*<img src={image} alt={title} className="course-image" />*/}

            <h2>{title}</h2>
            <p>{description}</p>
            <p><strong>Преподаватель:</strong> {teacherName}</p>
            <p><strong>Дата создания:</strong> {new Date(createdAt).toLocaleDateString()}</p>
            <p><strong>Последнее обновление:</strong> {new Date(updatedAt).toLocaleDateString()}</p>

            <h3>Видео с курса</h3>
            <div className="video-list">
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
            <button>Просмотреть все видео</button> {/* Кнопка для просмотра всех видео */}

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

            <h3>Уроки</h3>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.id}>
                        {lesson.title}
                        {lesson.isCompleted ? (
                            <span> (Завершен)</span>
                        ) : (
                            <button onClick={() => handleCompleteLesson(lesson.id)}>Завершить</button>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={handleBack}>Назад к списку</button>
        </div>
    );
};

export default CourseDetail;
