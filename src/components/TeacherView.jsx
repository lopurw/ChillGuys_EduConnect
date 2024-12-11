import React, { useState, useRef } from "react";

const TeacherView = ({ onSwitchRole }) => {
  const [roomName, setRoomName] = useState("");
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [blobUrl, setBlobUrl] = useState(null);
  const recorderRef = useRef(null);
  const videoStreamRef = useRef(null);

  // Generate a new room name
  const generateRoomLink = () => {
    const newRoomName = `room-${Math.random().toString(36).substr(2, 9)}`;
    setRoomName(newRoomName);
  };

  // Join room and open in new tab
  const joinRoom = () => {
    if (roomName) {
      const roomUrl = `https://meet.jit.si/${roomName}`;
      window.open(roomUrl, "_blank");
    }
  };

  const startRecording = async () => {
    try {
      // Очистка старых данных
      setChunks([]);
      setBlobUrl(null);
  
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoStreamRef.current = stream;
      recorderRef.current = new MediaRecorder(stream);
  
      recorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setChunks(prev => [...prev, e.data]);
        }
      };
  
      recorderRef.current.onstop = () => {
        if (chunks.length > 0) {
          const blob = new Blob(chunks, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
        }
      };
  
      recorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error starting screen recording:", err);
    }
  };
  
  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      videoStreamRef.current.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  const viewRecording = () => {
    if (blobUrl) {
      window.open(blobUrl, "_blank");
      setBlobUrl(null); // Reset blobUrl after viewing
      setChunks([]); // Clear previous chunks
    }
  };

  return (
    <div>
      <button onClick={generateRoomLink}>Создать комнату</button>
      {roomName && (
        <div>
          <p>
            Комната создана: <strong>{roomName}</strong>
          </p>
          <button onClick={joinRoom}>Перейти в комнату</button>
        </div>
      )}
      {recording ? (
        <div>
          <button onClick={stopRecording}>Остановить запись</button>
        </div>
      ) : (
        <button onClick={startRecording}>Запись экрана</button>
      )}
     
        <div>
          <button onClick={viewRecording}>Посмотреть запись</button>
        </div>
    
    </div>
  );
};

export default TeacherView;
