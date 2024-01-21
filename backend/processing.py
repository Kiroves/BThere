import faces, transcribe, chatgpt, capture, recognition
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

    ret = capture.capture_frame(video_filename, "files")
    return ret[0], ret[1]


def get_mood_from_emotions(emotion_string):
    """Returns the mood based on emotions string"""
    # Split the string into individual emotion-value pairs
    pairs = emotion_string.split(',')

    # Create a dictionary to store emotion-value pairs
    emotions = {}
    likelihood_name = {
        "UNKNOWN": 0,
        "VERY_UNLIKELY": 1,
        "UNLIKELY": 2,
        "POSSIBLE": 3,
        "LIKELY": 4,
        "VERY_LIKELY": 5,
    }
    for pair in pairs:
        emotion, value = pair.split(':')
        
        print(emotion,value)
        emotions[emotion.strip()] = likelihood_name[value.strip()]

    # Find the emotion with the highest value
    max_emotion = max(emotions, key=emotions.get)
    # if all equal then return neutral
    if emotions[max_emotion] < 3:
        max_emotion = "neutral"
    print(max_emotion)
    return max_emotion


def post_process(video_filename: str, email: str, db: firestore.client, match_face: bool, friend_id: str):
    """Processes video file through all APIs and fills in the database
    First time - match_face = False, friend_id = "somehting"
    Second time - match_face = True, friend_id = None"""
    
    print("post_process called")
    print("match_face: ", match_face)
    print("friend_id: ", friend_id)
    print("email: ", email)
    print("video_filename: ", video_filename)
    
    # call APIs
    video_filename = change_path_separator(video_filename)
    image_path, emotions = choose_image(video_filename)
    print("image_path: ", image_path)
    convo = transcribe.transc(video_filename)
    print("convo: ", convo)
    rec = chatgpt.suggestions(emotions, convo)
    print("rec: ", rec)
    if match_face:
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
    
    # app = Flask(__name__)
    # CORS(app)
    # load_dotenv()
    # cred_obj = firebase_admin.credentials.Certificate(
    #     os.environ.get("FIREBASE_ADMIN_CREDENTIALS")
    # )

    # default_app = firebase_admin.initialize_app(
    #     cred_obj,
    #     {
    #         'storageBucket': os.environ.get('FIREBASE_STORAGE_BUCKET')
    #     }
    # )

    # db = firestore.client()

    # video_filename = os.path.join(os.path.dirname(__file__), "files", "vid_01.webm")
    # post_process(video_filename, "divy07ubc@gmail.com", db, False, "some-friend")
    
