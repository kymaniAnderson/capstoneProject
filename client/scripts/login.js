// VARIABLE DECLARATIONS:
var connectionURL = "http://192.168.100.78:5000"

function getPathologists(){
    return fetch(connectionURL.concat("/api/pathologist"))
    .then((res) => res.json())
    .then((json) => json);
}

async function validatePathologist(email, password){
    let pathologists = await getPathologists();
    let err = 0;

    pathologists.forEach((pathologist) => {
        if(pathologist.email === email){
            if(pathologist.password === password){
                window.location = "index.html";
            }
            else {
                err = 2;
            }
        }
        else{
            err = 1;
        }
    });

    if (err === 1) alert("ERROR:\nUser Not Found!");
    if (err === 2) alert("ERROR:\nPassword does not match user!");
}

document.getElementById("login-submit").addEventListener("click", function(event){
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log(email, password);
    validatePathologist(email, password);
});


