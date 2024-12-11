
import { useState } from "react";

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
      window.open(roomUrl, "_blank");
    }
  };

  return (
    <div>
      <h2>Student View</h2>
      <button onClick={onSwitchRole}>Войти как преподаватель</button>
      <button onClick={handleWantCall}>Хочу созвон</button>
      {showJoinButton && (
        <button onClick={handleJoinRoom}>Присоединиться к комнате</button>
      )}
    </div>
  );
};

export default StudentView;
