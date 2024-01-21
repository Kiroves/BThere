import os
import time
import random
import json
from dotenv import load_dotenv
import flask
import firebase_admin
from firebase_admin import firestore, storage
from flask import Flask
from flask_socketio import SocketIO
from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
video_chunks = []
video_filename = None
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
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
# bucket = storage.bucket()
# blob = bucket.blob("test.jpg")
# blob.upload_from_filename("test.jpg")
# blob.make_public()


@app.route("/api/hello_world", methods=["GET"])
def hello_world():
    return flask.jsonify({"success": True})

@app.route("/add_new_friend", methods=["POST"])
def add_new_friend():
    print(flask.request.args.get("email"))
    user_ref = db.collection(flask.request.args.get("email"))
    user_id = str(flask.request.args.get("name")) + "-" + time.strftime("%Y%m%d-%H%M%S")# generate random id
    user_data = {}
    user_data["id"] = user_id
    user_data["name"] = flask.request.args.get('name')
    user_data["photo"] = "test.jpg"                             # TODO: set from API
    user_data["rec"] = "reccomendation here"                    # TODO: set from API
    user_data["last_update"] = int(time.time())
    user_ref.document(user_id).set(user_data)
    # add events
    events_ref = user_ref.document(user_id).collection("events")
    event_id = "event " + time.strftime("%Y%m%d-%H%M%S") # generate random id
    event_data = {}
    event_data["title_summary"] = "title summary"               # TODO
    event_data["transcript_summery"] = "transcript summary"     # TODO
    event_data["date"] = int(time.time())
    event_data["overall_mood"] = "overall mood"                 # TODO
    events_ref.document(event_id).set(event_data)
    return flask.jsonify({"success": True})


@app.route("/delete_friend", methods=["POST"])
def delete_friend():
    ref = db.collection(flask.request.args.get("email"))
    ref.document(db.collection(flask.request.args.get("id"))).delete()
    return flask.jsonify({"success": True})


@app.route("/get_all_friends", methods=["GET"])
def get_all_friends():
    ref = db.collection(flask.request.args.get("email"))
    friends = []
    for doc in ref.stream():
        friends.append(doc.to_dict())
    friends.sort(key=lambda x: x["last_update"], reverse=True)  # sort by time
    return flask.jsonify({"success": True, "friends": friends})


# TODO: change to /friend/<id>
@app.route("/get_friend_info", methods=["GET"])
def get_friend_info():
    ref = db.collection(flask.request.args.get("email"))
    user_doc = ref.document(flask.request.args.get("id"))
    events = []
    for event_doc in ref.document(flask.request.args.get("id")).collection("events").stream():
        events.append(event_doc.to_dict())
    return flask.jsonify({'success': True, 'friend': user_doc.get().to_dict(), 'events': events})


@socketio.on("connect")
def handle_connect():
    print("Client connected")
    start()

def start():
    try:
        global video_filename

        # Perform any setup or initialization here
        print("Socket connection established. Performing setup...")

        # Generate a unique filename for the temporary compiled video
        video_filename = f"compiled_video_{random.randint(1000, 9999)}.webm"
        with open(video_filename, "wb") as f:
            f.write(b"")  # Create the file

        # Clear the global variable storing video chunks
        video_chunks.clear()

    except Exception as e:
        print(f"Error during setup: {e}")
        end()


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")
    end()

def end():
    try:
        # Perform any cleanup or finalization here
        print("Socket connection terminated. Performing cleanup...")
        print(f"Final compiled video saved: {video_filename}")

    except Exception as e:
        print(f"Error during cleanup: {e}")


@app.route("/get_video_interval", methods=["POST"])
def get_video_interval():
    try:
        # Get the binary data from the POST request
        blob = request.data

        # Call the socketio event to process the video chunk
        socketio.emit("videoChunk", blob)
        return flask.jsonify({"success": True})

    except Exception as e:
        print(f"Error handling video chunk: {e}")
        return flask.jsonify({"success": False, "error": str(e)})


@socketio.on("videoChunk")
def handle_video_chunk(data):
    try:
        print(f"Received video chunk with size: {len(data)} bytes")
        with open(video_filename, "ab") as f:
            f.write(data)

    except Exception as e:
        print(f"Error processing video chunk: {e}")


if __name__ == "__main__":
    socketio.run(app, debug=True, host='0.0.0.0')
