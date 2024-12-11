import React, { useState } from 'react';
import classes from "../styles/CoursesList.module.css";

const AddTaskPage = () => {
    // State to manage form input values
    const [taskData, setTaskData] = useState({
        title: '',
        content: '',
        resources: '',
        courseId: 1, // Assuming courseId is fixed for now or can be dynamic
    });

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make POST request to the API
        try {
            const response = await fetch('http://localhost:5220/api/Task/addTask', {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Task added successfully:', data);
            } else {
                console.error('Error adding task:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.course_add_wrapper}>
                    <div className={classes.course_add_card}>
                        <h1>Добавить новое задание</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Название задания:
                                <input type="text" name="title" value={taskData.title} onChange={handleInputChange} required />
                            </label>
                            <br />

                            <label>
                                Содержание задания:
                                <textarea name="content" value={taskData.content} onChange={handleInputChange} required />
                            </label>
                            <br />

                            <label>
                                Ресурсы (через запятую):
                                <input type="text" name="resources" value={taskData.resources} onChange={handleInputChange} />
                            </label>
                            <br />

                            <input type="hidden" name="courseId" value={taskData.courseId} />

                            <button type="submit">Сохранить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTaskPage;
