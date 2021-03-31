from flask import Flask, request, render_template, redirect, url_for
from flask_pymongo import PyMongo
from keys import keys
import datetime

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://admin:"+keys["pw"] + "@cluster0.41j7h.mongodb.net/"+keys["nm"]+"?retryWrites=true&w=majority"
mongo = PyMongo(app)

db_operations = mongo.db.patients
dte = datetime.datetime.now()  

# Index
@app.route('/', methods=["GET"])
def index():
    return render_template("index.html")

# Home
@app.route("/home", methods=["GET"])
def home():
    patients = db_operations.find()
    return render_template("home.html", patients=patients)

# Upload
@app.route("/upload", methods=["GET", "POST"])
def upload():
    if request.method == "POST":  
        if "imgFile" in request.files:
            imgFile = request.files["imgFile"]
            mongo.save_file(imgFile.filename, imgFile)
        
        newPatient = {
            "firstName" : request.form.get("firstName"),
            "lastName" : request.form.get("lastName"), 
            "age" : request.form.get("age"), 
            "notes" : request.form.get('notes'),
            "fileName" : imgFile.filename,
            "date" : dte.strftime("%x")
        }

        db_operations.insert_one(newPatient)
        return redirect(url_for("home"))
    else:
    	return render_template("upload.html")

# Logout
@app.route("/logout")
def logout():
    return redirect(url_for("index"))

# Render Image
@app.route("/file/<fileName>")
def file(fileName):
    return mongo.send_file(fileName)

# Profile
@app.route("/profile%<path:firstName>", methods=["GET"])
def profile(firstName):

    patient = mongo.db.patients.find_one_or_404({"firstName": firstName})
    return render_template("viewProfile.html", patient=patient)

# Update
@app.route("/update%<path:firstName>", methods=["GET", "POST"])
def update(firstName):

    filt = {"firstName": firstName}

    if request.method == "POST":
        
        temp = {
            "firstName" : request.form.get("firstName"),
            "lastName" : request.form.get("lastName"), 
            "age" : request.form.get("age"), 
            "notes" : request.form.get('notes'),
            "date" : dte.strftime("%x")
        }

        updatedPatient = {"$set": temp}
        db_operations.update_one(filt, updatedPatient)
        return redirect(url_for("home"))
    else:
        patient = mongo.db.patients.find_one_or_404({"firstName": firstName})
        return (render_template("update.html", patient=patient))

# Delete
@app.route("/delete%<path:firstName>")
def delete(firstName):
    db_operations.delete_one({"firstName": firstName})
    return redirect(url_for("home"))


# Main
if __name__ == '__main__':
    app.run(debug=True)
