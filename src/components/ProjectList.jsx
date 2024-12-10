import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard'; // Import ProjectCard
import { Link } from 'react-router-dom';
import { getAllProjects } from "../services/ApiServ.js";

const ProjectList = () => {
	const [projects, setProjects] = useState([]); // State to store projects
	const [selectedProject, setSelectedProject] = useState(null);

	// Fetch the projects when the component mounts
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await getAllProjects();
				setProjects(response.data); // Assuming response contains a data property with the projects
			} catch (error) {
				console.error("Error fetching projects:", error);
			}
		};

		fetchProjects();
	}, []);

	const handleStartProject = (project) => {
		setSelectedProject(project);
		// Additional logic for starting the project, like navigating to the project page
		console.log('Navigating to project:', project);
	};

	return (
		<div className="project-list">
			<h2>Мои проекты</h2> {/* Title "My Projects" */}
			<div className="project-cards">
				{projects.length > 0 ? (
					projects.map((project) => (
						<Link to={`/project/${project.id}`} key={project.id}>
							<ProjectCard project={project} onStartProject={handleStartProject} />
						</Link>
					))
				) : (
					<p>Нет проектов для отображения</p> // "No projects to display"
				)}
			</div>
		</div>
	);
};

export default ProjectList;
