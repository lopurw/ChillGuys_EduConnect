import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import image from "../assets/png-clipart-businessperson-african-american-black-graphy-chief-executive-man-miscellaneous-photography-thumbnail.png";
import { getCourseById, completeLesson } from "../services/ApiServ.js";
import classes from "../styles/CoursesDetail.module.css";

const CourseDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id); 
        setCourse(response.data); 
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCourse();
  }, [id]); 


  const handleBack = () => {
    navigate("/"); 
  };


  const handleCompleteLesson = async (lessonId) => {
    try {
      const studentId = localStorage.getItem("userId"); 
      if (!studentId) throw new Error("Student ID is missing.");

      const response = await completeLesson({ studentId, lessonId }); 
      window.location.reload();
      if (response.status === 200) {
        alert("Lesson marked as completed!");
    
        setCourse((prev) => ({
          ...prev,
          lessons: prev.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
          ),
        }));
      } else {
        console.error("Failed to complete lesson:", response);
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  if (loading) {
    return <p>Загрузка данных курса...</p>; 
  }

  if (!course) {
    return <p>Курс не найден</p>;
  }


  const {
    title,
    description,
    teacherName,
    lessons,
    createdAt,
    updatedAt,
    videoUrl,
    documentationUrl,
  } = course;


  const videoLinks = videoUrl ? videoUrl.split(",") : [];
  const documentationLinks = documentationUrl
    ? documentationUrl.split(",")
    : [];

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.course_detail}>
          <h2>{title}</h2>
          <div className={classes.course_detail_header}>
            {" "}
            <div className={classes.course_detail_header_item}>
              <img src={image} alt={title} className={classes.course_image} />{" "}
              <div className={classes.course_detail_header_item_text}>
                <p>{description}</p>{" "}
                <p>
                  <strong>Дата создания:</strong>{" "}
                  {new Date(createdAt).toLocaleDateString()}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Последнее обновление:</strong>{" "}
                  {new Date(updatedAt).toLocaleDateString()}
                </p>
              </div>{" "}
            </div>
            <div className={classes.course_detail_header_item}>
              {" "}
              <img src={image} alt={title} className={classes.course_image} />
              <div className={classes.course_detail_header_item_text}>
                {" "}
                <p>
                  <strong>Преподаватель:</strong> {teacherName}{" "}
                </p>
              </div>{" "}
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

            {videoLinks.length > 0 ? (


                <button>Просмотреть все видео</button>
                )
             : (
                    <></>
            )}
          </div>

          <div className={classes.documentation_block}>
            <h3>Документация</h3>
            <div className={classes.documentation_block_items}>
              {documentationLinks.length > 0 ? (
                  <div className={classes.documentation_block_item_wrapper}>
                    {documentationLinks.map((doc, index) => (
                        <div className={classes.documentation_block_item} key={index}>
                          <img src={'/public/Document_icon.png'} alt={''} className="course-image" />
                          <a href={`${doc}`} target="_blank" rel="noopener noreferrer">
                            Документ {index + 1}
                          </a>
                        </div>
                    ))}
                  </div>
              ) : (
                  <p>Документация не доступна.</p>
              )}
            </div>
          </div>

          <ul className={classes.documentation_block}>
            <h3>Задания</h3>
            {lessons.length > 0 ? (
                <div className={classes.documentation_block_item_wrapper}>
                  {lessons.map((doc, index) => (
                      <li key={lesson.id}>
                        {lesson.title}
                        {lesson.isCompleted ? (
                            <span> (Завершен)</span>
                        ) : (
                            <button onClick={() => handleCompleteLesson(lesson.id)}>
                              Завершить
                            </button>
                        )}
                      </li>
                  ))}
                </div>
            ) : (
                <p>Задания не доступны.</p>
            )}
          </ul>

          <button>Вступить</button>

		  
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
