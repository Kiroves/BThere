import React, { useState } from 'react';
import VideoUploader from './VideoUploader';
import VideoPreview from './VideoPreview';

const AddFriend = ({ onSubmit }) => {
    const [friendName, setFriendName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [sourceKey, setSourceKey] = useState(0);
    const [progress, setProgress] = useState(0);

    const handleNameChange = (e) => {
        setFriendName(e.target.value);
    };

    const handleFileChange = (file) => {
        setSelectedFile(file);
        setSourceKey((prevKey) => prevKey + 1);
        setProgress(0);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!selectedFile) {
            return;
        }
        const email = window.localStorage.getItem("email") || "";
        const token = window.localStorage.getItem("token") || "";
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/add_new_friend?email=${email}&name=${friendName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    return (
        <div>
            <div>First time meeting someone? Add their name to BThere and we'll remember their name and face!</div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={friendName} onChange={handleNameChange} />
                </label>
                <br />
                <label class="space-y-4">

                    <VideoUploader
                        selectedFile={selectedFile}
                        setSelectedFile={handleFileChange}
                        setSourceKey={setSourceKey}
                        progress={progress}
                        setProgress={setProgress}
                    />
                </label>
                <br />
                {selectedFile && <VideoPreview sourceKey={sourceKey} selectedFile={selectedFile} />}
                <br />
                <button type="submit" class="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded">
                    Add Friend
                </button>

            </form>
        </div>
    );
};

export default AddFriend;
