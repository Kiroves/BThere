import os
import time
import random
from dotenv import load_dotenv
import flask
import firebase_admin
from firebase_admin import firestore

load_dotenv()

cred_obj = firebase_admin.credentials.Certificate(os.environ.get('FIREBASE_CREDENTIALS'))

default_app = firebase_admin.initialize_app(cred_obj)
db = firestore.client()

app = flask.Flask(__name__)

@app.route('/add_new_friend', methods=['POST'])
def add_new_friend():
    rcv_data = flask.request.get_json()
    ref = db.collection(rcv_data['user'])
    id = str(rcv_data['name']) + "-" + time.strftime("%Y%m%d-%H%M%S") # generate random id
    send_data = {}
    send_data["name"] = rcv_data['name']
    send_data["photo"] = None  # TODO: set from API
    send_data["mood"] = None  # TODO: set from API
    send_data["rec"] = None  # TODO: set from API
    send_data["dialogue"] = None  # TODO: set from API
    ref.document(id).set(send_data)
    return flask.jsonify({'success': True})

@app.route('/get_all_friends', methods=['GET'])
def get_all_friends():
    rcv_data = flask.request.get_json()
    ref = db.collection(rcv_data['user'])
    friends = []
    for doc in ref.stream():
        friends.append(doc.to_dict())
    return flask.jsonify({'success': True, 'friends': friends})

@app.route('/get_friend_info', methods=['GET'])
def get_friend_info():
    rcv_data = flask.request.get_json()
    ref = db.collection(rcv_data['user'])
    doc = ref.document(rcv_data['id']).get()
    return flask.jsonify({'success': True, 'friend': doc.to_dict()})

if __name__ == '__main__':
    app.run(debug=True)
