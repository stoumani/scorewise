/*const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('mydb.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the mydb.db SQLite database.');
});

db.run('CREATE TABLE IF NOT EXISTS emp (empid INTEGER PRIMARY KEY, empname TEXT, email TEXT)', (err) => {
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
}); */

function generateSettings() {
    let num = document.getElementById("numMembers").value;

    //To be taken out most likely
    let button = document.getElementById("subBtn");
    button.remove();

    for(i=1; i<=num; i++){
        //Create elements
        const divItem = document.createElement("div");
        const divInput = document.createElement("div");
        const input = document.createElement("input");

        //Add classes and ids for those needed
        divItem.classList.add("item");
        divInput.classList.add("ui");
        divInput.classList.add("input");
        input.setAttribute('id', `teamName${i}`);

        //Create text
        const teamName = document.createTextNode(`Team ${i}`);
        
        //Build the structure
        divInput.appendChild(input);
        divItem.appendChild(teamName);
        divItem.appendChild(divInput);

        //Get the parent
        const element = document.getElementById("sidebar");

        //Add the structure
        element.appendChild(divItem);
    }

}

function makeBracket() {
    //Get number
    let num = document.getElementById("numMembers").value;

    let size = 4;
    let extra = 0;
    let rounds = 1;

    //Determine bracket size, rounds, extra slots
    let index = 0;
    while(num>Math.pow(2,index)){
        index++;
    }
    size = Math.pow(2,index);
    extra = Math.pow(2,index)%num;
    rounds = index

    //Create array for all teams
    const teams = [];

    //Get teams and fill array
    for(i=0; i<num; i++){
        team = document.getElementById(`teamName${i+1}`).value;
        teams[i] = team;
    }
    //Fill extra
    for(i=0; i<extra; i++){
        teams[num+i] = "-";
    }
    for(i=0; i<size; i++){
        console.log(teams[i]);
    }

    //Generate html
    generateSingleBracket(size, size, teams);
}

function generateSingleBracket(size, originsize, teams){
    
    //Get parent element
    const parent = document.getElementById("main");

    //Create round div and and add classes
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round");
    roundDiv.classList.add(`r-of-${size}`);

    //Construct a round of games
    for(i=0; i<size/2; i++){
        //Create game div and class
        const bracketgameDiv = document.createElement("div");
        bracketgameDiv.classList.add("bracket-game");

        let teamTop = document.createTextNode("-");
        let teamBot = document.createTextNode("-");

        if(size===originsize){
            teamTop = document.createTextNode(`${teams[i]}`);
            teamBot = document.createTextNode(`${teams[i+1]}`);
        }
        let scoreTop = document.createTextNode("0");
        let scoreBot = document.createTextNode("0");

        //Create player div and class
        const playerTopDiv = document.createElement("div");
        playerTopDiv.classList.add("player");
        playerTopDiv.classList.add("top");
        playerTopDiv.appendChild(teamTop);

        const playerBotDiv = document.createElement("div");
        playerBotDiv.classList.add("player");
        playerBotDiv.classList.add("bot");
        playerBotDiv.appendChild(teamBot);

        //Create score div and class
        const scoreTopDiv = document.createElement("div");
        scoreTopDiv.classList.add("score");
        scoreTopDiv.appendChild(scoreTop);
        const scoreBotDiv = document.createElement("div");
        scoreBotDiv.classList.add("score");
        scoreBotDiv.appendChild(scoreBot);

        //Add the score div to the player div
        playerTopDiv.appendChild(scoreTopDiv);
        playerBotDiv.appendChild(scoreBotDiv);

        //Add top class to player and add to game div
        bracketgameDiv.appendChild(playerTopDiv);

        //Add bot class to player and add another to game div
        bracketgameDiv.appendChild(playerBotDiv);

        //Add the game div to the round div
        roundDiv.appendChild(bracketgameDiv);
    }

    //Add the round to the parent
    parent.appendChild(roundDiv);

    if(size>2){
        const connectDiv = document.createElement("div");
        connectDiv.classList.add("connectors");

        //code for lines goes here
        for(i=0; i<size/4; i++){
            const topLine = document.createElement("div");
            topLine.classList.add("top-line");

            const botLine = document.createElement("div");
            botLine.classList.add("bottom-line");

            const vertLine = document.createElement("div");
            vertLine.classList.add("vert-line");

            const nextLine = document.createElement("div");
            nextLine.classList.add("next-line");

            const clear1 = document.createElement("div");
            clear1.classList.add("clear");
            const clear2 = document.createElement("div");
            clear2.classList.add("clear");
            const clear3 = document.createElement("div");
            clear3.classList.add("clear");
            const clear4 = document.createElement("div");
            clear4.classList.add("clear");

            connectDiv.appendChild(topLine);
            connectDiv.appendChild(clear1);
            connectDiv.appendChild(botLine);
            connectDiv.appendChild(clear2);
            connectDiv.appendChild(vertLine);
            connectDiv.appendChild(clear3);
            connectDiv.appendChild(nextLine);
            connectDiv.appendChild(clear4);
        }

        parent.append(connectDiv);

        generateSingleBracket(size/2, originsize);
    }

}