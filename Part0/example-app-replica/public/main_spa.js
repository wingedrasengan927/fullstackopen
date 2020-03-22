
// first we get the notes available in the server, load them into a global variable and display it
// then as we add new notes, we send the note to the server to be stored,
// and instead of reloading the page, we store the note to the global variable as well and display it

// get the notes available in the server, store them into a global variable and display them
const xhttp = new XMLHttpRequest();

var notes = [];

function displayNotes () {
    const ul = document.createElement("ul");
    notes.forEach(note => {
        var li = document.createElement('li');
        li.textContent = note;
        ul.appendChild(li);
    })

    const notesDiv = document.getElementById("notes");
    if (notesDiv.hasChildNodes()){
        notesDiv.removeChild(notesDiv.childNodes[0]);
    }
    notesDiv.appendChild(ul);
}

xhttp.onreadystatechange = function() {
    if (this.status==200 && this.readyState==4) {
        notes = JSON.parse(this.responseText);
        displayNotes();
    }
}

xhttp.open("GET", "/data", true);
xhttp.send();

// when a new note is entered, store it to the global variable, display it and send it to the server

function sendToServer(note) {
    const xhttpPost = new XMLHttpRequest();
    xhttpPost.onreadystatechange = function () {
        if (this.readyState==4 && this.status==201){
            console.log(this.responseText);
        }
    }

    xhttpPost.open("POST", "/new_note_spa", true);
    xhttpPost.setRequestHeader("Content-type", "application/json");
    xhttpPost.send(JSON.stringify([note])); // note that only an array or an object can be jsonified
}

window.onload = function(event) {
    const formElement = document.getElementById("notes_form");
    formElement.onsubmit = function(event) {
        event.preventDefault();
        
        var note = event.target.elements[0].value;
        notes.push(note);
        event.target.elements[0].value = "";
        displayNotes();
        sendToServer(note)
    }
}