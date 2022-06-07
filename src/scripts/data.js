import GoldDiff from "./goldDiff";
import GoldShare from "./goldShare";
import MatchInfo from "./matchInfo";
class Data {
  constructor(team1, team2){
    this.generateData(team1, team2);
    this.loading=false;
  }

  async generateData(team1, team2){
    const start = Date.now();
    console.log('Data is loading...');

    let blueWins = 0;
    let redWins = 0;
    let playerGolds = [];
    let playerNames = []; // blue players, red players
    let championNames = []; // blue champions, red champions
    let bans = [];
    let team2tags = [];
    let team1tags = [];
    let winners = [];

    let goldDiffy = [];
    let matchInfo = [];

    await d3.csv('./src/data/LeagueofLegends.csv', function(d){
      if (((team1 && team2) && (team1 === d.blueTeamTag && team2 === d.redTeamTag)) || ((team1 && !team2) && (team1 === d.blueTeamTag)) || ((team2 && !team1) && team2 === d.redTeamTag)){

        team2tags.push(d.redTeamTag);
        team1tags.push(d.blueTeamTag);
        
        if (parseInt(d.bResult) === 1){
          blueWins+=1;
          winners.push(d.blueTeamTag);
        }
        else {
          redWins+=1;
          winners.push(d.redTeamTag);
        }

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
        let currentblueBans = d.blueBans.slice(1,d.blueBans.length-1).replaceAll("'","").split(",");
        currentblueBans = currentblueBans.map(ban => ban.trim());
        let currentredBans = d.redBans.slice(1,d.redBans.length-1).replaceAll("'","").split(",");
        currentredBans = currentredBans.map(ban => ban.trim());
        bans.push(currentblueBans.concat(currentredBans));

        //get goldDiff for each game
        let goldDiff = JSON.parse(d.golddiff).map((ele, idx) => {
          return {
            minute: idx,
            goldDiff: ele
          };
        });
        goldDiffy.push(goldDiff);

        //get match info for each game
        matchInfo.push([d.Year, d.Season, d.Type, d.League]);
      };
    }); // finish fetching data


    let headtohead = document.getElementById('overall-record');
    headtohead.innerHTML = `${team1} ${blueWins} - ${redWins} ${team2}`;

    let statsdiv = document.getElementById('stats');

    for( let i = 0; i < playerNames.length; i++){
      let gameInfo = document.createElement('div');
      gameInfo.setAttribute('id',`game-${i}`);
      gameInfo.setAttribute('class','game-info');
      statsdiv.append(gameInfo);

      let bluePlayers = document.createElement('div');
      let blueteamLabel = document.createElement('h2');
      blueteamLabel.innerText = `${team1tags[i]}`;
      bluePlayers.setAttribute('id', `blueteam${i}`);
      bluePlayers.setAttribute('class', 'players-container blue');
      bluePlayers.append(blueteamLabel);
      
      let redPlayers = document.createElement('div');
      let redteamLabel = document.createElement('h2');
      redteamLabel.innerText = `${team2tags[i]}`;
      redPlayers.setAttribute('id', `redteam${i}`);
      redPlayers.setAttribute('class', 'players-container red');
      redPlayers.append(redteamLabel);

      gameInfo.append(bluePlayers);
      gameInfo.append(redPlayers);


      let blueattach = document.getElementById(`blueteam${i}`);
      let redattach = document.getElementById(`redteam${i}`);
      let bluesBans = document.createElement('p');
      let redsBans = document.createElement('p');

      blueattach.append(bluesBans);
      redattach.append(redsBans);


      let mid = bans[i].length/2;
      let allBluesBans = [];
      let allRedsBans = [];

      for (let c = 0; c < mid; c++){

        allBluesBans.push(bans[i][c]);
      }
      for (let c = mid; c < mid*2; c++){

        allRedsBans.push(bans[i][c]);
      }

      bluesBans.innerHTML = `<b>Bans:</b> ${allBluesBans.join(", ")}`;
      redsBans.innerHTML = `<b>Bans:</b> ${allRedsBans.join(", ")}`;

      // time to generate all the graphs
      try {
        // debugger
        let newGoldDiff = new GoldDiff(i, team1, team2, goldDiffy[i]);
        await newGoldDiff.generateGoldGraph(i, team1, team2, goldDiffy[i]);
        let newMatchInfo = new MatchInfo(i, team1, team2, matchInfo);
        await newMatchInfo.getMatchInfo(i, team1, team2, matchInfo)
        let newGoldShare = new GoldShare(i, playerNames[i], playerGolds[i]);
      } catch {
        return;
      }

      let newblueTable = document.createElement('table');
      newblueTable.setAttribute('class', 'playerinfotable');
      let newredTable = document.createElement('table');
      newredTable.setAttribute('class', 'playerinfotable');
      bluePlayers.append(newblueTable);
      redPlayers.append(newredTable);

      let newRow1 = document.createElement('tr');
      newRow1.innerHTML = '<tr><th><b>Role</b></th><th><b>Player Name</b></th><th><b>Champion Name</b></th><th><b>Gold</b></th></tr>';
      newblueTable.append(newRow1);
      let newRow2 = document.createElement('tr');
      newRow2.innerHTML = '<tr><th><b>Role</b></th><th><b>Player Name</b></th><th><b>Champion Name</b></th><th><b>Gold</b></th></tr>';
      newredTable.append(newRow2);

      for (let j = 0; j < playerNames[i].length; j++) {
        let role;
        let color;
        switch (j % 5) {
          case 0: role = 'Top'; color='#66c2a5'; break;
          case 1: role = 'Jungle'; color='#fc8d62'; break;
          case 2: role = 'Mid'; color='#8da0cb'; break;
          case 3: role = 'ADC'; color='#e78ac3'; break;
          case 4: role = 'Support'; color='#a6d854'; break;
        }

        let player = document.createElement('tr');
        player.innerHTML = `<td> ${role} </td> <td> ${playerNames[i][j]} </td> <td> ${championNames[i][j]} </td> <td> ${playerGolds[i][j]} </td> `;
        player.setAttribute('style', `color:${color}`);
        if (j < 5) {
          newblueTable.append(player);
        } else {
          newredTable.append(player);
        }
      }
      // winner
      let winner = document.createElement('h2');
      winner.setAttribute('class','winner hidden');
      winner.setAttribute('id',`winner${i}`)
      winner.innerHTML = `Winner: ${winners[i]}`;
      gameInfo.appendChild(winner);
      
    }
    console.log(`data loaded in: ${(Date.now() - start)/1000}s`);
  } // end of async function
} // ending curly brace for class

export default Data;