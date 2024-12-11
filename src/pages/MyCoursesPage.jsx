import MyCourses from "../components/MyCourses.jsx";
import classes from '../styles/MyCourses.module.css';

export default function  MyCoursesPage(){
    return(
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.my_courses_page_wrapper}>
                    <MyCourses></MyCourses>
                </div>
            </div>
        </div>

    )
}