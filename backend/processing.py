import transcribe, chatgpt, capture, recognition
import firebase_admin
from firebase_admin import firestore, storage
from deepface import DeepFace
import os
import time
from dotenv import load_dotenv
import shutil
from flask import Flask

load_dotenv()


def change_path_separator(file_path):
    # Replace backslashes with forward slashes
    updated_path = file_path.replace('\\', '/')
    return updated_path


def choose_image(video_filename):
    """Chooses the image with a familiar face in it from the video file

    Args:
        video_filename (str): Path to video file

    Returns:
        tuple: (Path to image file, emotions)
    """

    return capture.capture_frame(video_filename)


def get_mood_from_emotions(emotion_string):
    """Returns the mood based on emotions string"""
    # Split the string into individual emotion-value pairs
    pairs = emotion_string.split(',')

    # Create a dictionary to store emotion-value pairs
    emotions = {}
    for pair in pairs:
        emotion, value = pair.split(':')
        emotions[emotion.strip()] = int(value)

    # Find the emotion with the highest value
    max_emotion = max(emotions, key=emotions.get)
    return max_emotion


def post_process(video_filename: str, email: str, db: firestore.client):
    """Processes video file through all APIs and fills in the database"""
    # call APIs
    video_filename = change_path_separator(video_filename)
    image_path, emotions = choose_image(video_filename)
    convo = transcribe.transc(video_filename)
    rec = chatgpt.suggestions(emotions, convo)
    friend_id = recognition.match_face(image_path, email)
    
    # update database
    user_ref = db.collection(email)
    user_ref.document(friend_id).update({"rec": rec})
    user_ref.document(friend_id).update({"last_update": int(time.time())})
    bucket = storage.bucket()
    blob = bucket.blob(image_path)
    blob.upload_from_filename(image_path)
    user_ref.document(friend_id).update({"photo": blob.public_url})
    blob.make_public()
    
    # update event
    events_ref = user_ref.document(friend_id).collection("events")
    event_id = "event " + time.strftime("%Y%m%d-%H%M%S")
    event_data = {}
    event_data["transcript_summary"] = convo  # TODO: change to transcript summary
    event_data["date"] = int(time.time())
    event_data["overall_mood"] = get_mood_from_emotions(emotions)
    events_ref.document(event_id).set(event_data)


def live_process(video_filename):
    pass


if __name__ == "__main__":
    import flask
    from flask_cors import CORS
    
    app = Flask(__name__)
    CORS(app)
    load_dotenv()
    cred_obj = firebase_admin.credentials.Certificate(
        os.environ.get("FIREBASE_ADMIN_CREDENTIALS")
    )

    default_app = firebase_admin.initialize_app(
        cred_obj,
        {
            'storageBucket': os.environ.get('FIREBASE_STORAGE_BUCKET')
        }
    )

    db = firestore.client()

    video_filename = os.path.join(os.path.dirname(__file__), "files", "test.mp4")
    # post_process(video_filename, "divy07ubc@gmail.com", db)