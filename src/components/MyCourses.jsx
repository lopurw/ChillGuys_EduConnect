import React from "react";
import CourseCard from "./CourseCard";

const MyCourses = () => {
  
  const courses = [
    {
      id: 1,
    
      title: "JavaScript для начинающих",
      description: "Изучите основы JavaScript с нуля.",
      image: "https://via.placeholder.com/150",
      duration: "10 часов",
      progress: 0.3, 
    },
    {
      id: 2,
      title: "React: Погружение",
      description: "Углубленное изучение React.",
      image: "https://via.placeholder.com/150",
      duration: "15 часов",
      progress: 0.7, 
    },
    {
      id: 3,
      title: "Node.js для продвинутых",
      description: "Углубленное изучение Node.js.",
      image: "https://via.placeholder.com/150",
      duration: "20 часов",
      progress: 0.5, 
    },
  ];


  const handleStartCourse = (course) => {
    console.log(`Начинаем курс: ${course.title}`);
  };

  return (
    <div className="my-courses">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onStartCourse={handleStartCourse}
          showProgress={true}
        />
      ))}
    </div>
  );
};

export default MyCourses;
