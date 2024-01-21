import React, { useState, useEffect, useRef } from 'react';

const PublishingComponent = () => {
    const [publishing, setPublishing] = useState(false);
    const [websocketConnected, setWebsocketConnected] = useState(false);
    const localVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const videoChunkInterval = 10000; // 10 seconds
    const backendApiUrl = 'YOUR_BACKEND_API_URL'; // Replace with your backend API URL

    const handlePublish = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;
            peerConnectionRef.current = createPeerConnection();
            stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current.onstop = handleRecordingStopped;

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

        // Send the recorded data to your backend using an HTTP request
        sendRecordingToBackend(recordedBlob);

        // Clear the recorded chunks for the next recording
        recordedChunksRef.current = [];

        // Start a new recording after 10 seconds
        setTimeout(() => {
            mediaRecorderRef.current.start();
            setTimeout(() => {
                mediaRecorderRef.current.stop();
            }, videoChunkInterval);
        }, 10000);
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
        }
    };

    const sendRecordingToBackend = (blob) => {
        const formData = new FormData();
        formData.append('video', blob);

        fetch(backendApiUrl, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend if needed
                console.log('Backend response:', data);
            })
            .catch(error => {
                console.error('Error sending recording to backend:', error);
            });
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
            {!publishing ? (
                <button disabled={!websocketConnected} onClick={handlePublish}>
                    Start Publishing
                </button>
            ) : (
                <button onClick={() => mediaRecorderRef.current.stop()}>Stop Publishing</button>
            )}
        </div>
    );
};

export default PublishingComponent;
