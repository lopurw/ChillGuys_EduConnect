import React, { useState, useRef } from "react";

const Video = () => {
  const [roomName, setRoomName] = useState(""); 
  const [isTeacher, setIsTeacher] = useState(false); 
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const recorderRef = useRef(null);
  const videoStreamRef = useRef(null);

  const handleCreateRoom = () => {
    const newRoomName = `room-${Math.random().toString(36).substr(2, 9)}`;
    setRoomName(newRoomName);
  };

  const handleJoinRoom = () => {
    if (!roomName) {
      alert("Преподаватель ещё не создал комнату.");
      return;
    }
    window.open(`https://meet.jit.si/${roomName}`, "_blank");
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
        // Сохранение записи после завершения
        const blob = new Blob(chunks, { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "recording.mp4";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Очистка данных
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
      recorderRef.current.stop(); // Триггер завершения записи
      setRecording(false);
      recorderRef.current = null;
      videoStreamRef.current?.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
    }
  };

  return (
    <div>
      <h1>Video Call App</h1>
      {!isTeacher ? (
        <button onClick={handleJoinRoom}>Хочу созвон</button>
      ) : (
        <>
          <button onClick={handleCreateRoom}>Создать комнату</button>
          {roomName && (
            <p>
              Комната создана: <strong>{roomName}</strong>
            </p>
          )}
        </>
      )}
      <button onClick={() => setIsTeacher(!isTeacher)}>
        {isTeacher ? "Войти как ученик" : "Войти как преподаватель"}
      </button>

      {isTeacher && (
        <>
          {!recording ? (
            <button onClick={startRecording}>Начать запись</button>
          ) : (
            <button onClick={stopRecording}>Остановить запись</button>
          )}
        </>
      )}
    </div>
  );
};

export default Video;
