///////////////////////////////////////////////////////////////////////////////////////////////////
// Name:    startup.js
// 
// Desc:    A javascript program that creates a database for the tournament website, generates the 
//          html for teaminput in the database with the teams
//
// Authors: Eric, Salem
// Date:    April 7, 2023
///////////////////////////////////////////////////////////////////////////////////////////////////

//Genral requirements (JSON, SQLite, etc)
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Create the database 
const db = new sqlite3.Database('tournament.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

//Create a table in the database if it does not exist
db.run('CREATE TABLE IF NOT EXISTS tourny (id INTEGER PRIMARY KEY, team_name TEXT, team_placement TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/addEmployee', (req, res) => {
  const { empid, empname, email } = req.body;
  db.run(`INSERT INTO emp (empid, empname, email) VALUES (?, ?, ?)`, [empid, empname, email], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/');
  });
});

// Add this code after the /addEmployee endpoint
app.get('/employees', (req, res) => {
    db.all('SELECT * FROM emp', [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.send(rows);
    });
  });
  
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

function generateSettings(num) {

    let parent = document.getElementById("participants");
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }

    //Create elements
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    divContainer.classList.add("text-center");

    const divRow = document.createElement("div");
    divRow.classList.add("row");
    divRow.classList.add("align-items-start");

    const divCol1 = document.createElement("div");
    divCol1.classList.add("col");

    const divCol2 = document.createElement("div");
    divCol2.classList.add("col");

    for(i=0; i<num; i++){
        //Create text
        const teamName1 = document.createTextNode(`Team ${i+1}`);
        const teamName2 = document.createTextNode(`Team ${i+2}`);
        
        const input1 = document.createElement("input");
        input1.classList.add("input");
        input1.classList.add("w-input");
        input1.setAttribute('id', `teamName${i}`);

        const input2 = document.createElement("input");
        input2.classList.add("input");
        input2.classList.add("w-input");
        input2.setAttribute('id', `teamName${i+1}`);
      
        //Build the structure

        divCol1.appendChild(teamName1);
        divCol1.appendChild(input1);

        divCol2.appendChild(teamName2);
        divCol2.appendChild(input2);

        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);

        divContainer.appendChild(divRow);

        //Add the structure
        parent.appendChild(divContainer);
        i++;
    }

}