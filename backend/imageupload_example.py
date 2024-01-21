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

user_id = "id"                     # id found from image comparison or list of friends
user_ref = db.collection("email") # email received from flask request
fileName = "file"
bucket = storage.bucket()
blob = bucket.blob(fileName)
blob.upload_from_filename(fileName)
user_ref.document(user_id).update({"photo": blob.public_url})

blob.make_public()

# mydict = user_ref.document(user_id).get().to_dict()
# print(mydict["photo"])