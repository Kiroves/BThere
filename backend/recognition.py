from firebase_admin import storage
import firebase_admin
from firebase_admin import firestore
import os
from dotenv import load_dotenv
import requests
from deepface import DeepFace



def match_face(imagepath, email):
    

    db = firestore.client()
    mindist = 1
    user_id = ""

    user_ref = db.collection(email)      # email from flask request
    for doc in user_ref.stream():
        mydict = doc.to_dict()
        url = mydict["photo"]
        response = requests.get(url)
        local_filename = "compare.png"
        if response.status_code == 200:
            with open(local_filename, 'wb') as file:
                file.write(response.content)
            print(f"Image downloaded successfully to {local_filename}")
        else:
            print(f"Failed to download image. Status code: {response.status_code}")
        res = DeepFace.verify(img1_path = imagepath, img2_path = local_filename)["distance"]
        if mindist > res:
            mindist = res
            user_id = mydict["id"]

    return user_id

        
