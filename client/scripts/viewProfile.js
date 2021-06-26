// VARIABLE DECLARATIONS:
var connectionURL = "http://192.168.100.78:5000"

function createRecordCard(record){
    //START: Card Body as DIV:
    var recordCardDiv = document.createElement("DIV");
    recordCardDiv.classList.add("card-body");

    //START: Card Content as DIV:
    var recordCardContent = document.createElement("DIV");
    recordCardContent.classList.add("card-content");
    
    //START: Notes as H5:
    var recordNotes = document.createElement("H5");

    var recordNotesLabel = document.createElement("SPAN");
    recordNotesLabel.classList.add("title");
    recordNotesLabel.innerHTML = "Notes: ";

    var recordNotesContent = document.createElement("SPAN");
    recordNotesContent.innerHTML = record.patientNotes;

    //STOP: Notes as H5:
    recordNotes.append(recordNotesLabel);
    recordNotes.append(recordNotesContent);

    //START: Last Updated as H5:
    var recordUpdated = document.createElement("H5");

    var recordUpdatedLabel = document.createElement("SPAN");
    recordUpdatedLabel.classList.add("title");
    recordUpdatedLabel.innerHTML = "Last Updated: ";

    var recordUpdatedContent = document.createElement("SPAN");
    recordUpdatedContent.innerHTML = record.lastUpdated;

    //STOP: Last Updated as H5:
    recordUpdated.append(recordUpdatedLabel);
    recordUpdated.append(recordUpdatedContent);

    //START: ISUP Grade as H5:
    var recordGrade = document.createElement("H5");

    var recordGradeLabel = document.createElement("SPAN");
    recordGradeLabel.classList.add("title");
    recordGradeLabel.innerHTML = "ISUP Grade: ";

    var recordGradeContent = document.createElement("SPAN");
    recordGradeContent.innerHTML = record.isupGrade;

    //STOP: ISUP Grade as H5:
    recordGrade.append(recordGradeLabel);
    recordGrade.append(recordGradeContent);

    //STOP: Card Content as DIV:
    recordCardContent.append(recordNotes);
    recordCardContent.append(recordUpdated);
    recordCardContent.append(recordGrade);

    //START: Card Image as DIV:
    var recordCardImg = document.createElement("DIV");
    recordCardImg.classList.add("card-image");

    var recordImg = document.createElement("IMG");
    recordImg.setAttribute("src", connectionURL.concat("/file/").concat(record.imageLink));
    recordImg.setAttribute("alt", "prostate cell");

    //STOP: Card Image as DIV:
    recordCardImg.append(recordImg);

    //STOP: Card Body as DIV:
    recordCardDiv.append(recordCardContent);
    recordCardDiv.append(recordCardImg);

    return recordCardDiv;
}

function getPatient(id){
    return fetch(connectionURL.concat("/api/patient/").concat(id))
    .then((res) => res.json())
    .then((json) => json);
}

function getRecords(){
    return fetch(connectionURL.concat("/api/record"))
    .then((res) => res.json())
    .then((json) => json);
}

async function createPageContent(id){
    let patient = await getPatient(id);
    let records = await getRecords();
    console.log(patient);

    lastNameID = document.getElementById("lastName");
    firstNameID = document.getElementById("firstName");
    patientAgeID = document.getElementById("patientAge");

    lastNameID.innerHTML = patient.lastName.toUpperCase();
    firstNameID.innerHTML = patient.firstName;
    patientAgeID.innerHTML = patient.patientAge;

    records.forEach((record) => {
        if (record.patientID === id){
            var container = document.querySelector(".container");
            container.append(createRecordCard(record));
        }
    });
}

window.onload = function() {
    id = sessionStorage.getItem("patientID");
    createPageContent(id);
};
