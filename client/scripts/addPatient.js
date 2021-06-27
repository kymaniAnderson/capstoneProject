// VARIABLE DECLARATIONS:
var connectionURL = "http://192.168.100.78:5000"

var count;
const buffer = 6000000;

window.onload = function() { 
    getNextID();
};

function getPatients(){
    return fetch(connectionURL.concat("/api/patient"))
    .then((res) => res.json())
    .then((json) => json);
}

async function getNextID(){
    let patients = await getPatients();
    let maxID = buffer-1;

    patients.forEach((patient) => {
        idToInt = parseInt(patient.patientID);

        if(idToInt > maxID){
           maxID = idToInt;
           count = maxID + 1;
        }
    });    
}

document.getElementById("patient-submit").addEventListener("click", function(event){
    event.preventDefault(); 

    if(count){
        patientID = count;
    }
    else{
        patientID = buffer;
    }

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let patientAge = document.getElementById("patientAge").value;

    let jsonBody = {
        "firstName": firstName,
        "lastName": lastName,
        "patientAge": patientAge,
        "patientID": patientID.toString()
    };

    fetch(connectionURL.concat("/api/patient"), {
        method: "POST",
        body: JSON.stringify(jsonBody),
        headers:{
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json)
    .then((json) => console.log(json));

    //redirect back to previous page:
    window.location.replace("index.html");
});