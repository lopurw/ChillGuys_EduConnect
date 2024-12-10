import React from 'react';
import classes from '../styles/Comment.module.css';

const Comment = ({ author, content }) => {
	return (
		<div className={classes.comment}>
			<strong>{author}:</strong>
			<p>{content}</p>
		</div>
	);
};

export default Comment;
