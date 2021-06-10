// VARIABLE DECLARATIONS:
var connectionURL = "http://192.168.100.74:5000"

document.getElementById("patient-submit").addEventListener("click", function(event){
    event.preventDefault(); 

    let patientID = document.getElementById("patientID").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let patientAge = document.getElementById("patientAge").value;

    let jsonBody = {
        "firstName": firstName,
        "lastName": lastName,
        "patientAge": patientAge,
        "patientID": patientID
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