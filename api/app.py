from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from marshmallow import Schema, fields, ValidationError
from bson.json_util import dumps
from flask_cors import CORS
from json import loads
from datetime import datetime
from werkzeug.datastructures import ImmutableMultiDict
import json

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://admin:DCcnOr247jWxC4Y4@cluster0.41j7h.mongodb.net/pcaso-db?retryWrites=true&w=majority"
mongo = PyMongo(app)

db_patients = mongo.db.patients
db_records = mongo.db.records

class PatientSchema(Schema):
    firstName = fields.String(required=True)
    lastName = fields.String(required=True)
    patientAge = fields.Integer(required=True)
    patientID = fields.String(required=True)

# TO-DO: 
# ADD: auto generate an ID
# ADD: model % prediction here, remove manual add of isupGrade
class RecordSchema(Schema):
    imageLink = fields.String(required=True)
    lastUpdated = fields.String(required=True)
    patientNotes = fields.String(required=True)
    isupGrade = fields.Integer(required=True)
    patientID = fields.String(required=True)
    
# ROUTE 1:
@app.route('/api/patient', methods=["GET", "POST"])
def allPatients():
    if request.method == "POST":
        # /POST
        try:
            firstName = request.json["firstName"]
            lastName = request.json["lastName"]
            patientAge = request.json["patientAge"]
            patientID = request.json["patientID"]

            jsonBody = {
                "firstName": firstName,
                "lastName": lastName,
                "patientAge": patientAge,
                "patientID": patientID
            }

            newPatient = PatientSchema().load(jsonBody)
            db_patients.insert_one(newPatient)

            return{
                "sucess": True,
                "message": "Patient saved to database successfully!"
            }, 200

        except ValidationError as err:
            return {
                "sucess": False,
                "message": "An error occured while trying to post patient"
            }, 400
    else:
        # /GET
        patients = db_patients.find()
        return jsonify(loads(dumps(patients))), 200

# ROUTE 2:
@app.route("/api/patient/<path:id>", methods=["GET", "PATCH", "DELETE"])
def onePatient(id):
    filt = {"patientID" : id}

    if request.method == "PATCH":
        # /PATCH
        updates = {"$set": request.json}
        db_patients.update_one(filt, updates)      
        updatedPatient = db_patients.find_one(filt)

        return jsonify(loads(dumps(updatedPatient)))

    elif request.method == "DELETE":
        # /DELETE
        tmp = db_patients.delete_one(filt)
        result = {"sucess" : True} if tmp.deleted_count == 1 else {"sucess" : False}

        return result
    
    else:
        # /GET
        patient = db_patients.find_one(filt)
        return  jsonify(loads(dumps(patient)))

# ROUTE 3:
@app.route('/api/record', methods=["GET", "POST"])
def allRecords():
    if request.method == "POST":
        # /POST
        try:
            imgFile = request.files["imgFile"]
            data = request.values

            if imgFile.filename == "":
                imageLink = "blank-attached"
            else:
                imageLink = imgFile.filename
                mongo.save_file(imageLink, imgFile)

            lastUpdated = datetime.now().strftime("%c")
            patientID = data.getlist("patientID")
            patientNotes =  data.getlist("patientNotes")
            isupGrade =   data.getlist("isupGrade")

            jsonBody = {
                "imageLink": imageLink,
                "lastUpdated": lastUpdated,
                "patientNotes": patientNotes.pop(),
                "isupGrade": isupGrade.pop(),
                "patientID": patientID.pop()
            }
            
            newRecord = RecordSchema().load(jsonBody)
            db_records.insert_one(newRecord)

            return{
                "sucess": True,
                "message": "Record saved to database successfully!"
            }, 200

        except ValidationError as err:
            return {
                "sucess": False,
                "message": "An error occured while trying to post record"
            }, 400
    else:
        # /GET
        records = db_records.find()
        return jsonify(loads(dumps(records))), 200

# Render Image
@app.route("/file/<fileName>")
def file(fileName):
    return mongo.send_file(fileName)

# Main
if __name__ == '__main__':
    app.run(debug=True, host="192.168.100.77", port=5000)
