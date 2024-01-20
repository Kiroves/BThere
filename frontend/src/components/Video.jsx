"use client";
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const VideoUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [sourceKey, setSourceKey] = useState(0);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setSourceKey((prevKey) => prevKey + 1); // Increment the key to force a re-render

        const reader = new FileReader();

        reader.onprogress = (e) => {
            const loaded = e.loaded;
            const total = e.total;
            const progressPercentage = Math.round((loaded * 100) / total);
            setProgress(progressPercentage);
        };

        reader.onload = (e) => {
            setProgress(100); // Set progress to 100% when loading is complete
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <input
                id="file-input"
                type="file"
                accept="video/*"
                className="mb-4"
                onChange={handleFileChange}
            />

            {selectedFile && (
                <div>
                    <video
                        id="video"
                        key={sourceKey} // Change the key to force re-render when a new file is selected
                        width="300"
                        height="300"
                        controls
                        className="border-2 border-black block mb-4"
                    >
                        <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                    </video>

                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                    {progress}%
                                </span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col w-full">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all ease-in-out duration-300"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoUploader;
