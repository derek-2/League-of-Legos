import GoldDiff from "./goldDiff";
class Data {
  constructor(team1, team2){
    console.log('hello');
    this.team1 = team1;
    this.team2 = team2;
    this.generateData(team1, team2);
  }

  async generateData(team1, team2){
    // console.log('me generate gold graph!!!');

    // general info on the match
    let matchInfo = [];

    // stats of the match
    // let goldDiffy = [];
    let playerGolds = [];
    let playerNames = []; // blue players, red players
    let championNames = []; // blue champions, red champions
    let bans = []; // blue bans, red bans

    await d3.csv('../../data/LeagueofLegends.csv', function(d){
      if ((d.blueTeamTag === team1 || d.redTeamTag === team1) && 
      (d.blueTeamTag === team2 || d.redTeamTag === team2)) {
        // debugger;
        matchInfo.push([d.Year, d.Season, d.Type]);


        // // get gold diff data --> changed to fit the d3 line graph notation
        // let goldDiff = JSON.parse(d.golddiff).map( (ele, idx) => {
        //   return {
        //     minute: idx,
        //     goldDiff: ele
        //   };
        // });
        // goldDiffy.push(goldDiff);
       
        
        // get player golds of both teams at the end of the game
        let idx = JSON.parse(d.goldblueTop).length-1; // gets the idx for last minute of the game

        let blueGold = [];
        let redGold = [];

        blueGold.push(JSON.parse(d.goldblueTop)[idx]);
        blueGold.push(JSON.parse(d.goldblueJungle)[idx]);
        blueGold.push(JSON.parse(d.goldblueMiddle)[idx]);
        blueGold.push(JSON.parse(d.goldblueADC)[idx]);
        blueGold.push(JSON.parse(d.goldblueSupport)[idx]);

        redGold.push(JSON.parse(d.goldredTop)[idx]);
        redGold.push(JSON.parse(d.goldredJungle)[idx]);
        redGold.push(JSON.parse(d.goldredMiddle)[idx]);
        redGold.push(JSON.parse(d.goldredADC)[idx]);
        redGold.push(JSON.parse(d.goldredSupport)[idx]);

        playerGolds.push(blueGold.concat(redGold));

        // get player names of both teams
        playerNames.push([d.blueTop, d.blueJungle, d.blueMiddle, d.blueADC, d.blueSupport,d.redTop, d.redJungle, d.redMiddle, d.redADC, d.redSupport]);

        // get champion names of both teams
        championNames.push([d.blueTopChamp, d.blueJungleChamp, d.blueMiddleChamp, d.blueADCChamp, d.blueSupportChamp,d.redTopChamp, d.redJungleChamp, d.redMiddleChamp, d.redADCChamp, d.redSupportChamp]);

        // get bans of both teams, could have just used JSON.parse
        let blueBans = d.blueBans.slice(1,d.blueBans.length-1).replaceAll("'","").split(",");
        blueBans = blueBans.map(ban => ban.trim());
        let redBans = d.redBans.slice(1,d.redBans.length-1).replaceAll("'","").split(",");
        redBans = redBans.map(ban => ban.trim());

        bans.push(blueBans.concat(redBans));


      }
    });
    let canvas = document.getElementById('main');
    // debugger;

    for( let i = 0; i < playerNames.length; i++){
      let gameInfo = document.createElement('div');
      gameInfo.setAttribute('id',`game-${i}`);
      gameInfo.setAttribute('class','game-info');
      canvas.append(gameInfo);
      // debugger;
      new GoldDiff(i,team1, team2);

    }



    // for(let i = 0; i < playerNames.length; i++){ //iterate through each game
    //   // debugger;
    //   let gameInfo = document.createElement('div');
    //   gameInfo.setAttribute('id',`game-${i}`);

    //   // create gold chart (have to iterate from 0 to goldDiffy[i].length and create a line graph) 
    //   // -------
    //   // debugger;
    //   // debugger;
    //   new GoldDiff(i,team1, team2);
    //   // ----------




    //   for(let j = 0; j < playerNames[i].length; j++ ){
    //     // gameinfo is going to be a div element containinng each match the two teams played vs each other
    //     // create average stats for both teams
    //     // create scoreboard with player name, champ name, stats, bans
    //     let player = document.createElement('p');
    //     player.innerHTML = `${playerNames[i][j]} ${playerGolds[i][j]}`;
    //     gameInfo.append(player);

  
        
  
  
  
    //     canvas.append(gameInfo);
    //     // debugger;
    //   }
    //   let linebreak = document.createElement('br');
    //   canvas.append(linebreak);
    // }


    // console.log(goldDiffy.length, playerNames.length, championNames.length, bans.length);

    // bans[0].forEach(champ => console.log(champ, champ.length));
    // console.log(bans[0][0]);
    // console.log(playerNames);
    // console.log(goldDiffy.length);



  } // end of async function







} // ending curly brace for class

// export Data class
export default Data;