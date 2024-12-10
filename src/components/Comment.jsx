import React from 'react';

const Comment = ({ author, content }) => {
	return (
		<div className="comment">
			<strong>{author}:</strong>
			<p>{content}</p>
		</div>
	);
};

export default Comment;
