const StudentView = ({ onSwitchRole, roomName }) => {
    const handleJoinRoom = () => {
      
      window.open(`https://meet.jit.si/${roomName}`, "_blank");
    };
  
    return (
      <div>
        <h2>Student View</h2>
        <button onClick={onSwitchRole}>Войти как преподаватель</button>
        <button onClick={handleJoinRoom}>Хочу созвон</button>
      </div>
    );
  };
  export default StudentView;