import { useState } from 'react';
import classes from "../styles/TeacherView.module.css";

const StudentView = ({ onSwitchRole, roomName }) => {
	const [showJoinButton, setShowJoinButton] = useState(false);

	const handleWantCall = () => {
		setTimeout(() => {
			setShowJoinButton(true);
		}, 5000);
	};

	const handleJoinRoom = () => {
		if (roomName) {
			const roomUrl = `https://meet.jit.si/${roomName}`;
			window.open(roomUrl, '_blank');
		} else {
			alert('Room name is not specified!');
		}
	};

	return (
		<div className={classes.call_wrapper}>
			<h2>Student View</h2>
			<div className={classes.call_wrapper_buttons}>
              <button onClick={onSwitchRole}>Войти как преподаватель</button>
				<button onClick={handleWantCall}>Хочу созвон</button>
				{showJoinButton && (
				<a href={`https://meet.jit.si/${roomName}`} target="_blank" rel="noopener noreferrer">
					Присоединиться к комнате
				</a>
			)}
          </div>
		</div>
	);
};

export default StudentView;
