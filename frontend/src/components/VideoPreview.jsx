export default function VideoPreview({sourceKey, selectedFile}) {
  const handleVideoTouch = () => {
    const video = document.getElementById("video");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <video
      id="video"
      key={sourceKey}
      width="100%"
      height="auto"
      controls
      className="border-2 border-black block mb-4"
      onTouchStart={handleVideoTouch}>
      <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
    </video>
  );
}
