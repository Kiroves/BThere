import cv2
import os
import faces
from PIL import Image


def capture_frame(videopath, output_folder) -> str:
    """Given a video file, captures a frame with a face in it and returns the path to the image file"""
    cap = cv2.VideoCapture(videopath)
    video_filename = os.path.basename(videopath)

    if not cap.isOpened():
        print("Error: Could not open video file.")
        return

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    fps = int(cap.get(cv2.CAP_PROP_FPS))

    ret_path = ""
    emotions = ""

    frame_number = 0
    while True:
        ret, frame = cap.read()

        if not ret:
            break

        if (frame_number % fps == 0) or (frame_number == 1):
            frame_path = os.path.join(output_folder, f"frame_{frame_number}.png")
            cv2.imwrite(frame_path, frame)
            emotions = faces.detect_faces_path(frame_path)
            if emotions != "":
                ret_path = frame_path
                break
        
        frame_number += 1

    cap.release()
    return ret_path, emotions
