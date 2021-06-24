// VARIABLE DECLARATIONS:
var connectionURL = "http://192.168.100.70:5000"

window.onload = function() { 
    sessionStorage.clear();
    drawTableBody();
};

function addTableHead(){
    var table = document.getElementById("patientTable");
    var header = table.createTHead();
    var row = header.insertRow(0);

    var patientIDHead = row.insertCell(0);
    patientIDHead.classList.add("head-row");

    var firstNameHead = row.insertCell(1);
    firstNameHead.classList.add("head-row");

    var lastNameHead = row.insertCell(2);
    lastNameHead.classList.add("head-row");

    var patientAgeHead = row.insertCell(3);
    patientAgeHead.classList.add("head-row");

    var actionsHead = row.insertCell(4);
    actionsHead.classList.add("head-row");


    patientIDHead.innerHTML = "Patient ID";
    firstNameHead.innerHTML = "First Name";
    lastNameHead.innerHTML = "Last Name";
    patientAgeHead.innerHTML = "Age";  
    actionsHead.innerHTML = "Actions";  
}

function addTableBody(patient){
    var table = document.getElementById("patientTable");

    var row = table.insertRow(0);

    var patientIDContent = row.insertCell(0);
    var firstNameContent = row.insertCell(1);
    var lastNameContent = row.insertCell(2);
    var patientAgeContent = row.insertCell(3);

    var actionsContent = row.insertCell(4);

    patientIDContent.innerHTML = patient.patientID;
    firstNameContent.innerHTML = patient.firstName;
    lastNameContent.innerHTML = patient.lastName;
    patientAgeContent.innerHTML = patient.patientAge;  

    // EDIT:
    var editButton = document.createElement("I");
    editButton.classList.add("fas", "fa-edit");
    editButton.setAttribute("onclick", "toggleForm('".concat(patient.patientID).concat("')"));
    actionsContent.append(editButton);

    // DELETE:
    var deleteButton = document.createElement("I");
    deleteButton.classList.add("fas", "fa-trash"); 
    deleteButton.setAttribute("onclick", "delFunc('".concat(patient.patientID).concat("')"));
    actionsContent.append(deleteButton);

    // PROFILE:
    var profileButton = document.createElement("I");
    profileButton.classList.add("fas", "fa-eye");
    profileButton.setAttribute("onclick", "viewProfile('".concat(patient.patientID).concat("')"));
    actionsContent.append(profileButton);
}

function toggleForm(patientID){
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");

    var popup = document.getElementById("popup");
    popup.classList.toggle("active");

    var submit = document.getElementById("submit");
    submit.classList.add("".concat(patientID));

    console.log("PATCH: ".concat(patientID));
}

function getPatients(){
    return fetch(connectionURL.concat("/api/patient"))
    .then((res) => res.json())
    .then((json) => json);
}

async function drawTableBody(){
    let patients = await getPatients();
    console.log(patients);

    patients.forEach((patient) => {
        addTableBody(patient);
    });
    addTableHead();
}

function delFunc(patientID){
    var funcPath = connectionURL.concat("/api/patient/").concat(patientID);
    
    fetch(funcPath, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        }
    });

    window.location.reload();
}

document.getElementById("back").addEventListener("click", function(event){
    window.location.reload();
});

document.getElementById("submit").addEventListener("click", function(event){
    let patientID = document.getElementById("patientID").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let patientAge = document.getElementById("patientAge").value;

    jsonBody = {};
    
    if (patientID !== "") jsonBody["patientID"] = patientID;
    if (firstName !== "") jsonBody["firstName"] = firstName;
    if (lastName !== "") jsonBody["lastName"] = lastName;
    if (patientAge !== "") jsonBody["patientAge"] = patientAge;

    var id = document.getElementById("submit").className;

    var funcPath = connectionURL.concat("/api/patient/").concat(id);
    fetch(funcPath, {
        method: "PATCH",
        body: JSON.stringify(jsonBody),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json)
    .then((json) => console.log(json));

    toggleForm("123");
});

function viewProfile(id){
    sessionStorage.setItem("patientID", id);
    window.location = ("viewProfile.html");
}