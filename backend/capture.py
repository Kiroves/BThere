import cv2
import os
import faces

def capture_frame(videopath, output_folder):
    cap = cv2.VideoCapture(videopath)

    if not cap.isOpened():
        print("Error: Could not open video file.")
        return

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    fps = int(cap.get(cv2.CAP_PROP_FPS))

    ret_path = ""

    frame_number = 0
    while True:
        ret, frame = cap.read()

        if not ret:
            break

        if (frame_number % fps == 0) or (frame_number == 1):
            frame_path = os.path.join(output_folder, f"frame_{frame_number}.png")
            cv2.imwrite(frame_path, frame)
            if faces.detect_faces_path(frame_path) != "":
                ret_path = frame_path
                break
        
        frame_number += 1

    cap.release()
    return ret_path