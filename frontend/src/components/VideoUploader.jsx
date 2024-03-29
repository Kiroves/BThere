"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
const VideoUploader = ({
  selectedFile,
  setSelectedFile,
  setSourceKey,
  disabled,
  progress,
  setProgress,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSourceKey((prevKey) => prevKey + 1);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      const loaded = e.loaded;
      const total = e.total;
      const progressPercentage = Math.round((loaded * 100) / total);
      setProgress(progressPercentage);
    };

    reader.onload = (e) => {
      setProgress(100);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    if (!selectedFile) {
      return;
    }
    setSelectedFile(null);
    setProgress(0);
  };

  return (
    <div className="self-center">
      <div className="flex flex-row">
        {selectedFile ? (
          <Button
            className="hover:cursor pb-1 bg-primary text-black hover:bg-primary"
            onClick={handleRemoveFile}
            disabled={disabled}>
            Remove Video
          </Button>
        ) : (
          <Button
            className="hover:cursor pb-1 text-black bg-primary hover:bg-primary"
            disabled={disabled}>
            <input
              id="file-input"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input" className="hover:cursor-pointer">
              Upload Video
            </label>
          </Button>
        )}
      </div>

      {/* progress bar */}
      {selectedFile && progress !== 0 && (
        <div>
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
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all ease-in-out duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
