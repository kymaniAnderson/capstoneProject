from flask import Flask, redirect, url_for, render_template, request

app = Flask(__name__)

# Index
@app.route('/')
def landing():
   return redirect(url_for("home"))

# Home
@app.route("/home")
def home():
    return render_template("home.html")

# Upload
@app.route("/upload")
def upload():
    return render_template("upload.html")

# Upload-Add
@app.route("/add", methods=['POST'])
def add():
    return redirect(url_for("home"))

# Logout
@app.route("/logout")
def logout():
    return redirect(url_for("home"))

# Main
if __name__ == '__main__':
   app.run(debug = True)