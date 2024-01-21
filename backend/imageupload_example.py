import faces, transcribe, chatgpt, capture
import flask
import json
import firebase_admin
from firebase_admin import firestore, storage
from deepface import DeepFace
import os
from dotenv import load_dotenv
import shutil

load_dotenv()

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

user_id = "Sean-20240121-000027"                     # id found from image comparison or list of friends
user_ref = db.collection("kelvinwong0519@gmail.com") # email received from flask request
fileName = "C:/Users/jseok627/Pictures/Camera Roll/WIN_20240120_17_51_42_Pro.jpg"
bucket = storage.bucket()
blob = bucket.blob(fileName)
blob.upload_from_filename(fileName)
user_ref.document(user_id).update({"photo": blob.public_url})

blob.make_public()

# mydict = user_ref.document(user_id).get().to_dict()
# print(mydict["photo"])