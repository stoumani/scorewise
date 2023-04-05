///////////////////////////////////////////////////////////////////////////////////////////////////
// Name:    BracketMaker.js
// 
// Desc:    A javascript program that generates the html for the bracket depending on the size.
//
// Authors: Eric, Salem
// Date:    April 7, 2023
///////////////////////////////////////////////////////////////////////////////////////////////////
let num = localStorage["num_teams"];
console.log(`Number of teams: ${num}`);
let teams =[];

for(i=0; i<num; i++){
  let team = localStorage[`teamName${i}`];
  console.log(`Team: ${i} - ${team}`);
  teams[i] = team;
}

generateSingleBracket(num, num, teams, 0);


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

          if(i===0){
            let lineHeight = Math.round((55.9075*Math.pow(Math.E, 0.682484*count))-1.15884);
            let lineMargin = Math.round((26.6131*Math.pow(Math.E, 0.694033*count))+.500125);
            vertLine.style.height = `${lineHeight}px`;
            vertLine.style.margin = `${lineMargin}px 0px`;
          }
          else{
            let lineHeight = Math.round((55.9075*Math.pow(Math.E, 0.682484*count))-1.15884)+1;
            let lineMargin = Math.round((54.937*Math.pow(Math.E, 0.686665*count))-3.01247);
            vertLine.style.height = `${lineHeight}px`;
            vertLine.style.margin = `${lineMargin}px 0px`;
          }

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
          if(size!==4){
            connectDiv3.appendChild(botLine);
          }
          
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