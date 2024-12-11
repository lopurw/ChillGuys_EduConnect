import { Link } from 'react-router-dom';
import classes from "../styles/ProjectCard.module.css";


const ProjectCard = ({ project, onStartProject }) => {
	return (
		<div className={classes.project_card}>
			<div className={classes.project_card_img_block}>
				<img src={project.image} alt={project.title} className="project-image" />
				<div className={classes.project_card_img_block_text}>
					<h3 className="project-title">{project.title}</h3>
					<p className="project-employer">Работодатель: {project.employer}</p>
				</div>
			</div>
			<div className={classes.project_duration}>
				<p>Время на проекте: {project.duration}</p>
			</div>
			<div className={classes.project_card_button_block}>
				<Link to={`/project/${project.id}`} key={project.id}>

					<button onClick={() => onStartProject(project)} className="start-button">
						Перейти
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
