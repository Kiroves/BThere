import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const PublishingComponent = ({ email }) => {
  const [publishing, setPublishing] = useState(false);
  const localVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  let intervalId = null;
  const videoChunkInterval = 5000; // 5 seconds
  const socketIoUrl = process.env.NEXT_PUBLIC_API_URL; // Replace with your Socket.IO server URL

  const socketRef = useRef(null);

  const handlePublish = async () => {
    console.log(publishing, mediaRecorderRef.current);
    try {
      if (publishing) {
        // If already publishing, stop the recording
        clearInterval(intervalId);
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
        socketRef.current.emit("videoComplete", email);
        socketRef.current.disconnect();
        setPublishing(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      peerConnectionRef.current = createPeerConnection();
      stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.onstop = handleRecordingStopped;

      // Connect to Socket.IO server
      socketRef.current = io(socketIoUrl);

      setPublishing(true);
      mediaRecorderRef.current.start();
      intervalId = setInterval(() => {
        if (!mediaRecorderRef.current) return;
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.start();
      }, videoChunkInterval);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const handleRecordingStopped = () => {
    const recordedBlob = new Blob(recordedChunksRef.current, { type: "video/webm" });

    // Send the recorded data to your backend using Socket.IO
    socketRef.current.emit("videoChunk", recordedBlob);

    // Clear the recorded chunks for the next recording
    recordedChunksRef.current = [];
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
      console.log(event.data.size);
    }
  };

  const createPeerConnection = () => {
    const iceServers = [{ urls: "stun:stun1.l.google.com:19302" }];
    const config = { iceServers };
    return new RTCPeerConnection(config);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initialize();
  }, []);

  return (
    <div className="text-center">
      <video
        ref={localVideoRef}
        controls
        autoPlay
        muted
        style={{
          width: "40vw",
          height: "60vh",
          maxWidth: "100%",
          maxHeight: "100%",
        }}></video>
      <button onClick={handlePublish}>{publishing ? "Stop Publishing" : "Start Publishing"}</button>
    </div>
  );
};

export default PublishingComponent;
