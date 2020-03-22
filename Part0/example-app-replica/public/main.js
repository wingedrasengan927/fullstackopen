const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        console.log(data);

        const ul = document.createElement("ul");
        
        for (let i =0; i<data.length; i++){
            let li = document.createElement("li");
            li.textContent = data[i];
            ul.appendChild(li);
        }

        const notesDiv = document.getElementById("notes");
        notesDiv.appendChild(ul);
    }
}

xhttp.open("GET", "/data", true);
xhttp.send();