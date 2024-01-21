import os
import json
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import firestore

load_dotenv()
print(firebase_admin.__version__)

cred_obj = firebase_admin.credentials.Certificate(os.environ.get('FIREBASE_CREDENTIALS'))

default_app = firebase_admin.initialize_app(cred_obj)
db = firestore.client()

# getting data from firestore
print(db.collection(u'data').document(u'test1').get().to_dict())

# # setting data in firestore
# doc_ref = db.collection(u'data').document(u'test1')
# doc_ref.set({
#     u'first': u'Ada',
#     u'last': u'Lovelace',
#     u'born': 1815
# })

# # update data in firestore
# doc_ref = db.collection(u'data').document(u'test1')
# doc_ref.update({
#     u'first': u'Ada',
#     u'last': u'Lovelace',
#     u'born': 1815
# })

# # delete document from firestore
# doc_ref = db.collection(u'data').document(u'test1')
# doc_ref.delete()

# # delete field from document in firestore
# doc_ref = db.collection(u'data').document(u'test1')
# doc_ref.update({
#     u'born': firestore.DELETE_FIELD
# })

# getting data from firestore
print(db.collection(u'data').document(u'test1').get().to_dict())