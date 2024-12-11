import classes from "../styles/TeacherView.module.css";

const StudentView = ({ onSwitchRole, roomName }) => {
    const handleJoinRoom = () => {

      if (!roomName) {
        alert("Преподаватель ещё не создал комнату.");
        return;
      }
      window.open(`https://meet.jit.si/${roomName}`, "_blank");
    };
  
    return (
      <div className={classes.call_wrapper}>
        <h2>Student View</h2>
          <div className={classes.call_wrapper_buttons}>
              <button onClick={onSwitchRole}>Войти как преподаватель</button>
              <button onClick={handleJoinRoom}>Хочу созвон</button>
          </div>
      </div>
    );
  };
  export default StudentView;