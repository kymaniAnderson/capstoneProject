from flask import Flask, redirect, url_for, render_template, request
from flask_pymongo import PyMongo
import datetime

app = Flask(__name__)

#MongoDB Setup
app.config["MONGO_URI"] = "mongodb+srv://admin:tO8BeqQEFzWvT9x7@cluster0.41j7h.mongodb.net/pcaso-db?retryWrites=true&w=majority"
mongo = PyMongo(app)

#Configuring Collection Name as patients
db_operations = mongo.db.patients

#Datetime Setup
dte = datetime.datetime.now()

# Index 
# todo: create landing page for this 
@app.route('/')
def index():
   return redirect(url_for("home"))

# Home
@app.route("/home", methods=["GET"])
def home():
    savedPatients = db_operations.find()
    return render_template("home.html", patients=savedPatients)

# Upload
@app.route("/upload")
def upload():
    return render_template("upload.html")

# Upload-Add
@app.route("/add", methods=["POST"])
def addPatient():
    if "imgFile" in request.files:
        imgFile = request.files["imgFile"]
        mongo.save_file(imgFile.filename, imgFile)
       
       #todo: will need to add probability for neural network aspect
        patientData = {
            "firstName" : request.form.get("firstName"),
            "lastName" : request.form.get("lastName"), 
            "notes" : request.form.get('notes'),
            "fileName" : imgFile.filename,
            "date" : dte.strftime("%x")
        }

        db_operations.insert(patientData)

    return redirect(url_for("home"))
  
# Logout
#todo: add login to landing page so this can work
@app.route("/logout")
def logout():
    return redirect(url_for("home"))

# View Profile
#todo: add actual html for profile and return all data
@app.route("/profile/<fileName>")
def profile(fileName):
    return mongo.send_file(fileName)


# Main
if __name__ == '__main__':
   app.run(debug = True)