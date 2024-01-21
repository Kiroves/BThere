import os
import time
import random
from dotenv import load_dotenv
import flask
import firebase_admin
from firebase_admin import firestore

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

@app.route('/get_video_interval', methods=['POST'])
def get_video_interval():
    # TODO: get blob
    # turn into video/audio
    # merge with previous one
    # send to GPT

if __name__ == '__main__':
    app.run(debug=True)
