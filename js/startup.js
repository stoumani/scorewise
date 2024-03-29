///////////////////////////////////////////////////////////////////////////////////////////////////
// Name:    startup.js
// 
// Desc:    A javascript program that creates a database for the tournament website, generates the 
//          html for team input in the database with the teams
//
// Authors: Eric, Salem
// Date:    April 7, 2023
///////////////////////////////////////////////////////////////////////////////////////////////////

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
        input1.required = true;
        input1.setAttribute('id', `teamName${i}`);

        const input2 = document.createElement("input");
        input2.classList.add("input");
        input2.classList.add("w-input");
        input2.required = true;
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

function fillDatabase(){
    let tournamentName = document.getElementById("nametour").value;
    let format = document.getElementById("format").value;
    let numTeams = document.getElementById("numteams").value;
    let decription = document.getElementById("desc").value;

    localStorage["tournament_name"] = tournamentName;
    localStorage["format"] = format;
    localStorage["num_teams"] = numTeams;
    localStorage["desc"] = decription;

    //Get teams and fill database
    for(i=0; i<numTeams; i++){
        let team = document.getElementById(`teamName${i}`).value;
        localStorage[`teamName${i}`] = team;
        console.log(`Team: ${i}, ${team}`);
    }

    document.location.href = "http://127.0.0.1:5500/index.html";
}