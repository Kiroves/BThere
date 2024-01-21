import faces, transcribe, chatgpt, capture,  recognition
import flask
import firebase_admin
from firebase_admin import firestore
from deepface import DeepFace
import os
from dotenv import load_dotenv
import shutil

load_dotenv()

def change_path_separator(file_path):
    # Replace backslashes with forward slashes
    updated_path = file_path.replace('\\', '/')
    return updated_path

temp_images = "temp_images"

videopath = ""    # get from either downloaded video
audiopath = ""    #  or received_chunk.webm
imagepath = capture.capture_frame(videopath, temp_images)

imagepath = change_path_separator(imagepath)
audiopath = change_path_separator(audiopath)

emotions = faces.detect_faces_path(imagepath)
convo = transcribe.transc(audiopath)

res = chatgpt.suggestions(emotions, convo)

cred_obj = firebase_admin.credentials.Certificate(
    os.environ.get("FIREBASE_ADMIN_CREDENTIALS")
)

default_app = firebase_admin.initialize_app(
    cred_obj,
    {
        'storageBucket': os.environ.get('NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET')
    }
)

db = firestore.client()

email = ""

user_id = recognition.match_face(imagepath, email)            # id found from image comparison
user_ref = db.collection(email)                               # email received from flask request
user_ref.document(user_id).update({"rec": res})

try:
    shutil.rmtree(temp_images)
    print(f"Directory '{temp_images}' successfully deleted.")
except Exception as e:
    print(f"Error deleting directory: {e}")