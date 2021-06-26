// VARIABLE DECLARATIONS:
var connectionURL = "http://192.168.100.78:5000"

formElement.onsubmit = async (event) => {
    event.preventDefault(); 

    let formData = new FormData(formElement);
    let oReq = new XMLHttpRequest();
    oReq.open("POST", connectionURL.concat("/api/record"), true);

    try{
        oReq.send(formData);    
    }
    catch(err){
        console.log(err);
    }

    //redirect back to previous page:
    window.location = ("index.html");
};