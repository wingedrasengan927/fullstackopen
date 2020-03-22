// Reference: https://github.com/mluukkai/example_app

const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser")
    app = express(),
    port = 5000;

// serve static files
app.use(express.static(path.join(__dirname, "public")))
// use middleware to parse requests
app.use(bodyParser())

const notes = ["Hello World"];

const notes_page = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/main.css" />
  <script type="text/javascript" src="main.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notes</h1>
    <div id='notes'>
    </div>
    <form action='/new_note' method='POST'>
      <input type="text" name="note"><br>
      <input type="submit" value="Save">
    </form> 
  </div>
</body>
</html>`

const notes_spa = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/main.css" />
  <script type="text/javascript" src="main_spa.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notes -- single page app</h1>
    <div id='notes'>
    </div>
    <form id='notes_form'>
      <input type="text" name="note"><br>
      <input type="submit" value="Save">
    </form>
  </div>
</body>
</html>
`

const getFrontPage = noteCount => {
    return(`
  <!DOCTYPE html>
      <html>
        <head>
        </head>
        <body>
          <div class='container'>
            <h1>Full stack exampe app</h1>
            <p>number of notes created ${noteCount}</p>
            <a href='/notes'>notes</a>
            <img src='kuva.png' width='200' />
          </div>
        </body>
      </html>
  `)
}

app.get("/", (req, res) => {
    const page = getFrontPage(notes.length);
    res.send(page);
})

app.get("/reset", (req, res) => {
    notes.splice(0, notes.length);
    res.status(201).send({message: "It is cleared"});
    console.log(notes)
})

app.get("/data", (req, res) => {
    res.send(notes);
})

app.get("/notes", (req, res) => {
    res.send(notes_page);
})

app.post("/new_note", (req, res) => {
    notes.push(req.body.note);
    res.redirect("/notes")
})

app.get("/notes_spa", (req, res) => {
    res.send(notes_spa);
})

app.post("/new_note_spa", (req, res) => {
    notes.push(req.body[0]);
    res.status(201).send({message: "A note has been created"});
})

app.listen(port, () => {
    `app is listening on port ${port}`
})