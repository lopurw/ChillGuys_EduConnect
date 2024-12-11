import React, { useState } from 'react';
import classes from "../styles/CoursesList.module.css";

const AddCoursePage = () => {
	// State to manage form input values
	const [courseData, setCourseData] = useState({
		title: '',
		description: '',
		videoUrl: '',
		documentationUrl: '',
		teacherId: 2, // Assuming teacherId is fixed for now
	});

	// Handle form input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCourseData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Make POST request to the API
		try {
			const response = await fetch('http://localhost:5220/api/Course/addCourse', {
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(courseData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Course added successfully:', data);
			} else {
				console.error('Error adding course:', response.statusText);
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
						<h1>Добавить новый курс</h1>
						<form onSubmit={handleSubmit}>
							{/* Title */}
							<label>
								Название курса:
								<input type="text" name="title" value={courseData.title} onChange={handleInputChange} />
							</label>
							<br />

							{/* Description */}
							<label>
								Описание курса:
								<textarea name="description" value={courseData.description} onChange={handleInputChange} />
							</label>
							<br />

							{/* Video URL */}
							<label>
								Ссылка на видео:
								<input type="text" name="videoUrl" value={courseData.videoUrl} onChange={handleInputChange} />
							</label>
							<br />

							{/* Documentation URL */}
							<label>
								Ссылка на документацию:
								<input type="text" name="documentationUrl" value={courseData.documentationUrl} onChange={handleInputChange} />
							</label>
							<br />

							{/* Teacher ID (hidden or static) */}
							<input type="hidden" name="teacherId" value={courseData.teacherId} />

							{/* Submit Button */}
							<button type="submit">Сохранить</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCoursePage;
