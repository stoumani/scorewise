///////////////////////////////////////////////////////////////////////////////////////////////////
// Name:    BracketMaker.js
// 
// Desc:    A javascript program that creates a database for the tournament website, generates the 
//          html of the bracket, and updates the bracket after scores are added.
//
// Authors: Eric, Salem
// Date:    March 7, 2023
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
    generateSingleBracket(size, size, teams, 0);
}

function generateSingleBracket(size, originsize, teams, count){

    //Get parent element
    const parent = document.getElementById("main");

    //Create round div and and add classes
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round");
    roundDiv.classList.add(`r-of-${size}`);

    //Construct a round of games
    for(i=0; i<size; i++){

      //Create spacer
      const spacer = document.createElement("div");
      spacer.style.paddingTop = "5px";
      const spacer2 = document.createElement("div");
      spacer2.style.paddingTop = "5px";
      
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
      playerTopDiv.setAttribute("id", `r-of-${size}-team-${i}`);
      playerTopDiv.setAttribute("name", `r-of-${size}-team-${i}`);
      playerTopDiv.appendChild(teamTop);


      const playerBotDiv = document.createElement("div");
      playerBotDiv.classList.add("player");
      playerBotDiv.classList.add("bot");
      playerBotDiv.setAttribute("id", `r-of-${size}-team-${i+1}`);
      playerBotDiv.setAttribute("name", `r-of-${size}-team-${i+1}`);
      playerBotDiv.appendChild(teamBot);

      //Create score div and class
      const scoreTopDiv = document.createElement("input");
      scoreTopDiv.classList.add("score");
      scoreTopDiv.setAttribute("id", `r-of-${size}-team-${i}-score`);
      scoreTopDiv.setAttribute("name", `r-of-${size}-team-${i}-score`);
      scoreTopDiv.setAttribute("onChange",`determineWinner(this.value, ${size}, ${i}, ${i+1})`);
      scoreTopDiv.setAttribute("type", "number");
      scoreTopDiv.setAttribute("placeholder","0");

    
      const scoreBotDiv = document.createElement("input");
      scoreBotDiv.classList.add("score");
      scoreBotDiv.setAttribute("id", `r-of-${size}-team-${i+1}-score`);
      scoreBotDiv.setAttribute("name", `r-of-${size}-team-${i+1}-score`);
      scoreBotDiv.setAttribute("onChange",`determineWinner(this.value, ${size}, ${i+1}, ${i})`);
      scoreBotDiv.setAttribute("type", "number");
      scoreBotDiv.setAttribute("placeholder","0");


      if(size!==originsize ){
          roundDiv.appendChild(spacer);
          roundDiv.style.marginLeft = 0;
          let paddingSize = Math.round((26.4758*Math.pow(Math.E, 0.697574*count))-26.2651);
          bracketgameDiv.style.paddingTop = `${paddingSize}px`;
          bracketgameDiv.style.paddingBottom = `${paddingSize}px`;
      }

      //Add the score div to the player div
      playerTopDiv.appendChild(scoreTopDiv);
      playerBotDiv.appendChild(scoreBotDiv);

      //Add top class to player and add to game div
      bracketgameDiv.appendChild(playerTopDiv);

      //Add bot class to player and add another to game div
      bracketgameDiv.appendChild(playerBotDiv);

      //Add the game div to the round div
      roundDiv.appendChild(bracketgameDiv);
      if(size!==originsize ){
        roundDiv.appendChild(spacer2);
      }
      i++;
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

          const nextLine = document.createElement("div");
          nextLine.classList.add("next-line");

          if(i===0){
            let marginSize = Math.round((26.6131*Math.pow(Math.E, 0.694033*count))+.500125);
            topLine.style.marginTop = `${marginSize}px`;
            topLine.style.marginBottom = `${marginSize}px`;

            marginSize = Math.round((55.802*Math.pow(Math.E, .683042*count))-5.02787);
            botLine.style.marginTop = `${marginSize}px`;
            botLine.style.marginBottom = `${marginSize}px`
          }
          else{
            let marginSize = Math.round((54.937*Math.pow(Math.E, 0.68665*count))-3.01247);
            topLine.style.marginTop = `${marginSize}px`;
            topLine.style.marginBottom = `${marginSize}px`

            marginSize = Math.round((55.802*Math.pow(Math.E, .683042*count))-5.02787);
            botLine.style.marginTop = `${marginSize}px`;
            botLine.style.marginBottom = `${marginSize}px`
          }

          connectDiv.appendChild(topLine);
          connectDiv.appendChild(botLine);

        }

        const connectDiv2 = document.createElement("div");
        connectDiv2.classList.add("connectors");
        connectDiv2.style.minWidth = "2px";

        //code for lines goes here
        for(i=0; i<size/4; i++){
          const vertLine = document.createElement("div");
          vertLine.classList.add("vert-line");

          connectDiv2.appendChild(vertLine);
        }

        const connectDiv3 = document.createElement("div");
        connectDiv3.classList.add("connectors");

        //code for lines goes here
        for(i=0; i<size/8; i++){
          const topLine = document.createElement("div");
          topLine.classList.add("top-line");

          const botLine = document.createElement("div");
          botLine.classList.add("bottom-line");

          if(i===0){
            let marginSize = Math.round((26.6131*Math.pow(Math.E, 0.694033*(count+1)))+.500125);
            topLine.style.marginTop = `${marginSize}px`;
            topLine.style.marginBottom = `${marginSize}px`;

            marginSize = Math.round((55.802*Math.pow(Math.E, .683042*(count+1)))-5.02787);
            botLine.style.marginTop = `${marginSize}px`;
            botLine.style.marginBottom = `${marginSize}px`
          }
          else{
            let marginSize = Math.round((54.937*Math.pow(Math.E, 0.68665*(count+1)))-3.01247);
            topLine.style.marginTop = `${marginSize}px`;
            topLine.style.marginBottom = `${marginSize}px`

            marginSize = Math.round((55.802*Math.pow(Math.E, .683042*(count+1)))-5.02787);
            botLine.style.marginTop = `${marginSize}px`;
            botLine.style.marginBottom = `${marginSize}px`
          }

          connectDiv3.appendChild(topLine);
          connectDiv3.appendChild(botLine);
        }

        parent.append(connectDiv);
        parent.append(connectDiv2);
        parent.append(connectDiv3);

        count++;
        generateSingleBracket(size/2, originsize, teams, count);
    }

}

function determineWinner(score, size, team_num, opponent_num){
  let team = `r-of-${size}-team-${team_num}`;
  let opponent = `r-of-${size}-team-${opponent_num}`;
  let opponent_score = document.getElementById(`r-of-${size}-team-${opponent_num}-score`).value;

  score = Number(score);
  opponent_score = Number(opponent_score);

  if(score>opponent_score){
    document.getElementById(team).classList.remove("loss");
    document.getElementById(team).classList.add("win");
    document.getElementById(opponent).classList.add("loss");
    document.getElementById(opponent).classList.remove("win");


    document.getElementById(`r-of-${size/2}-team-${Math.floor(team_num/2)}`).firstChild.replaceWith(
      document.createTextNode(document.getElementById(team).textContent));
  }
  else if(score<opponent_score){
    document.getElementById(opponent).classList.remove("loss");
    document.getElementById(opponent).classList.add("win");
    document.getElementById(team).classList.add("loss");
    document.getElementById(team).classList.remove("win");

    document.getElementById(`r-of-${size/2}-team-${Math.floor(team_num/2)}`).firstChild.replaceWith(
      document.createTextNode(document.getElementById(opponent).textContent));
  }
}