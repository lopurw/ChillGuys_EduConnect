import React, { useState, useRef } from "react";
import classes from "../styles/TeacherView.module.css";

const TeacherView = ({ onSwitchRole }) => {
  const [roomName, setRoomName] = useState("");
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const recorderRef = useRef(null);
  const videoStreamRef = useRef(null);

  const handleCreateRoom = () => {
    const newRoomName = `room-${Math.random().toString(36).substr(2, 9)}`;
    setRoomName(newRoomName);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      videoStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "recording.mp4";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setChunks([]);
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing media devices.", err);
      alert("Не удалось начать запись. Убедитесь, что у вас есть доступ к экрану.");
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      setRecording(false);
      recorderRef.current = null;
      videoStreamRef.current?.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
    }
  };

  return (
    <div className={classes.call_wrapper}>
      <h2>Teacher View</h2>
      <div className={classes.call_wrapper_buttons}>
        <button onClick={onSwitchRole}>Войти как ученик</button>
        <button onClick={handleCreateRoom}>Создать комнату</button>
        {roomName && (
            <p>
              Комната создана: <strong>{roomName}</strong>
            </p>
        )}
        {!recording ? (
            <button onClick={startRecording}>Начать запись</button>
        ) : (
            <button onClick={stopRecording}>Остановить запись</button>
        )}
      </div>
    </div>
  );
};
export default TeacherView;