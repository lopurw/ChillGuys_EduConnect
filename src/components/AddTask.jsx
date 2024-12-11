import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/HomeUser.module.css';

const AddCourse = () => {
    return (
        <div className={classes.addTaskButton_wrapper}>
            <Link to="/addtask">
                <button className={classes.addTaskButton}>+</button>
            </Link>
        </div>
    );
};

export default AddCourse;
