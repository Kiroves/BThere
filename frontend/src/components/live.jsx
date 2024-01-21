import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
const PublishingComponent = () => {
    const [publishing, setPublishing] = useState(false);
    const [websocketConnected, setWebsocketConnected] = useState(false);
    const localVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const videoChunkInterval = 10000; // 10 seconds
    const socketIoUrl = 'http://127.0.0.1:5000/get_video_interval'; // Replace with your Socket.IO server URL

    const socketRef = useRef(null);

    const handlePublish = async () => {
        try {
            if (publishing) {
                // If already publishing, stop the recording
                mediaRecorderRef.current.stop();
                setPublishing(false);
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;
            peerConnectionRef.current = createPeerConnection();
            stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current.onstop = handleRecordingStopped;

            // Connect to Socket.IO server
            socketRef.current = io(socketIoUrl);
            socketRef.current.on('connect', () => {
                setWebsocketConnected(true);
            });
            socketRef.current.on('disconnect', () => {
                setWebsocketConnected(false);
            });

            setPublishing(true);
            mediaRecorderRef.current.start();
            setTimeout(() => {
                mediaRecorderRef.current.stop();
            }, videoChunkInterval);
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const handleRecordingStopped = () => {
        const recordedBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });

        // Send the recorded data to your backend using Socket.IO
        socketRef.current.emit('videoChunk', recordedBlob);

        // Clear the recorded chunks for the next recording
        recordedChunksRef.current = [];
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
        }
    };

    const createPeerConnection = () => {
        const iceServers = [{ urls: 'stun:stun1.l.google.com:19302' }];
        const config = { iceServers };
        return new RTCPeerConnection(config);
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = stream;
                setWebsocketConnected(true);
            } catch (error) {
                console.error('Error accessing media devices:', error);
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
                    width: '40vw',
                    height: '60vh',
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
            ></video>
            <button onClick={handlePublish}>
                {publishing ? 'Stop Publishing' : 'Start Publishing'}
            </button>
        </div>
    );
};

export default PublishingComponent;
