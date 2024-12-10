const ProjectCard = ({ project, onStartProject }) => {
	return (
		<div className="project-card">
			<img src={project.image} alt={project.title} className="project-image" />
			<h3 className="project-title">{project.title}</h3>
			<p className="project-employer">Работодатель: {project.employer}</p>
			<p className="project-duration">Время на проекте: {project.duration}</p>
			<button onClick={() => onStartProject(project)} className="start-button">
				Перейти
			</button>
		</div>
	);
};

export default ProjectCard;
