import React, { useState, useEffect, useRef } from 'react';

const PublishingComponent = () => {
    const [publishing, setPublishing] = useState(false);
    const [websocketConnected, setWebsocketConnected] = useState(false);
    const localVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);

    const handlePublish = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;
            peerConnectionRef.current = createPeerConnection();
            stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
            setPublishing(true);
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const handleStopPublishing = () => {
        const stream = localVideoRef.current.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            localVideoRef.current.srcObject = null;
        }

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
        }

        setPublishing(false);
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
                <button onClick={handleStopPublishing}>Stop Publishing</button>
            )}
        </div>
    );
};

export default PublishingComponent;
