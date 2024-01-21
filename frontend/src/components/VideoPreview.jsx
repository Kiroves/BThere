import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VideoPreview({ sourceKey, selectedFile }) {
  const handleVideoTouch = () => {
    const video = document.getElementById("video");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const [isVideoOpen, setIsVideoOpen] = useState(true);

  return (
    <>
      <Button variant="secondary" className="pb-4" onClick={() => setIsVideoOpen((isVideoOpen) => !isVideoOpen)}>
        {isVideoOpen ? "Hide Video" : "Show Video"}
      </Button>
      {isVideoOpen && (
        <video
          id="video"
          key={sourceKey}
          width="100%"
          height="auto"
          controls
          className="border-2 border-black block my-4"
          onTouchStart={handleVideoTouch}>
          <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
        </video>
      )}
    </>
  );
}
