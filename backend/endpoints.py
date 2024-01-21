import os
import time
import random
import json
from dotenv import load_dotenv
import flask
import firebase_admin
from firebase_admin import firestore
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')
load_dotenv()

cred_obj = firebase_admin.credentials.Certificate(os.environ.get('FIREBASE_ADMIN_CREDENTIALS'))

default_app = firebase_admin.initialize_app(cred_obj)
db = firestore.client()

app = flask.Flask(__name__)

@app.route('/add_new_friend', methods=['POST'])
def add_new_friend():
    rcv_data = flask.request.get_json()
    user_ref = db.collection(rcv_data['user'])
    user_id = str(rcv_data['name']) + "-" + time.strftime("%Y%m%d-%H%M%S") # generate random id
    user_data = {}
    user_data["id"] = id
    user_data["name"] = rcv_data['name']
    user_data["photo"] = None  # TODO: set from API
    user_data["rec"] = None  # TODO: set from API
    user_data["last_update"] = time.time()
    user_ref.document(id).set(user_data)
    # # add events
    # events_ref = user_ref.document(id).collection("events")
    # event_id = "event " + time.strftime("%Y%m%d-%H%M%S") # generate random id
    # event_data = {}
    # event_data["title_summary"] = None  # TODO
    # event_data["transcript_summery"] = None  # TODO
    # event_data["date"] = time.time()
    # event_data["overall_mood"] = None  # TODO
    # events_ref.document(event_id).set(event_data)
    return flask.jsonify({'success': True})

@app.route('/delete_friend', methods=['POST'])
def delete_friend():
    rcv_data = flask.request.get_json()
    ref = db.collection(rcv_data['user'])
    ref.document(rcv_data['id']).delete()
    return flask.jsonify({'success': True})

@app.route('/get_all_friends', methods=['GET'])
def get_all_friends():
    rcv_data = flask.request.get_json()
    ref = db.collection(rcv_data['user'])
    friends = []
    for doc in ref.stream():
        friends.append(doc.to_dict())
    friends.sort(key=lambda x: x['last_update'], reverse=True)  # sort by time
    return flask.jsonify({'success': True, 'friends': friends})

@app.route('/get_friend_info', methods=['GET'])
def get_friend_info():
    rcv_data = flask.request.get_json()
    ref = db.collection(rcv_data['user'])
    doc = ref.document(rcv_data['id']).get()
    return flask.jsonify({'success': True, 'friend': doc.to_dict()})
@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('videoChunk')
def handle_video_chunk(data):
    try:
        # Process the received video chunk (you can replace this with your logic)
        print(f'Received video chunk with size: {len(data)} bytes')

        # Your logic to turn the blob into video/audio, merge with previous, and send to GPT
        process_video_chunk(data)

    except Exception as e:
        print(f'Error processing video chunk: {e}')

def process_video_chunk(blob):
    # TODO: Add your logic to process the video chunk
    # Here, you can access the binary blob directly and perform necessary operations
    # For example, you can save it to a file, process it, etc.
    with open('received_chunk.webm', 'wb') as f:
        f.write(blob)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('videoChunk')
def handle_video_chunk(data):
    try:
        # Process the received video chunk (you can replace this with your logic)
        print(f'Received video chunk with size: {len(data)} bytes')

        # Your logic to turn the blob into video/audio, merge with previous, and send to GPT
        process_video_chunk(data)

    except Exception as e:
        print(f'Error processing video chunk: {e}')

def process_video_chunk(blob):
    # TODO: Add your logic to process the video chunk
    # Here, you can access the binary blob directly and perform necessary operations
    # For example, you can save it to a file, process it, etc.
    with open('received_chunk.webm', 'wb') as f:
        f.write(blob)

    # After processing, you can send the result to GPT or perform any other actions

@app.route('/get_video_interval', methods=['POST'])
def get_video_interval():
    try:
        # Get the binary data from the POST request
        blob = request.data

        # Call the socketio event to process the video chunk
        socketio.emit('videoChunk', blob)
        print("working")
        return flask.jsonify({'success': True})

    except Exception as e:
        print(f'Error handling video chunk: {e}')
        return flask.jsonify({'success': False, 'error': str(e)})

@app.route('/get_video_interval', methods=['POST'])
def get_video_interval():
    # TODO: get blob
    # turn into video/audio
    # merge with previous one
    # send to GPT

if __name__ == '__main__':
    socketio.run(app, debug=True)
