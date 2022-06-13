import GoldDiff from "./goldDiff";
import GoldShare from "./goldShare";
import MatchInfo from "./matchInfo";
class Data {
  constructor(team1, team2){
    this.generateData(team1, team2);
    this.loading=false;
  }

  async generateData(team1, team2){
    // const start = Date.now();
    // console.log('Data is loading...');

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

    await d3.csv('https://derek-2.github.io/League-of-Legos/src/data/LeagueofLegends.csv', function(d){
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

        let idx = JSON.parse(d.goldblueTop).length-1;
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
      statsdiv.append(document.createElement('hr'));
      let gameInfo = document.createElement('div');
      gameInfo.setAttribute('id',`game-${i}`);
      gameInfo.setAttribute('class','game-info');
      statsdiv.append(gameInfo);

      let goldShareContainer = document.createElement('div');
      goldShareContainer.setAttribute('id', `graph-container-${i}`);
      goldShareContainer.setAttribute('class', 'gold-graphs')
      gameInfo.append(goldShareContainer);

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

      goldShareContainer.append(bluePlayers);
      goldShareContainer.append(redPlayers);


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

      bluesBans.innerHTML = `Bans: ${allBluesBans.join(", ")}`;
      redsBans.innerHTML = `Bans: ${allRedsBans.join(", ")}`;

      // time to generate all the graphs
      try {
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
      gameInfo.append(newblueTable);

      let newRow0 = document.createElement('tr');
      newblueTable.append(newRow0);
      
      let newRow00 = document.createElement('th');
      newRow00.innerHTML = '';

      let newRow01 = document.createElement('th');
      newRow01.colSpan=3;
      newRow01.innerHTML = 'Blue Team';
      
      let newRow02 = document.createElement('th');
      newRow02.innerHTML = 'Red Team';
      newRow02.colSpan=3;

      newRow0.append(newRow00, newRow01, newRow02);

      let newRow1 = document.createElement('tr');
      newRow1.innerHTML = '<tr><th>Role</th><th>Player</th><th>Champion</th><th>Gold</th><th>Gold</th><th>Champion</th><th>Player</th></tr>';
      newblueTable.append(newRow1);

      for (let j = 0; j < playerNames[i].length/2; j++) {
        let role;
        let color;
        switch (j % 5) {
          case 0: role = 'Top'; color='#AC92EB'; break;
          case 1: role = 'Jungle'; color='#4FC1E8'; break;
          case 2: role = 'Mid'; color='#A0D568'; break;
          case 3: role = 'ADC'; color='#FFCE54'; break;
          case 4: role = 'Support'; color='#ED5564'; break;
        }

        let player = document.createElement('tr');
        player.setAttribute('id', `${role}-${i}`)
        player.setAttribute('class', 'table-row')
        player.innerHTML = `<td> ${role} </td> <td> ${playerNames[i][j]} </td> <td> ${championNames[i][j]} </td> <td> ${playerGolds[i][j]} </td> <td> ${playerGolds[i][j+5]} </td>  <td> ${championNames[i][j+5]} </td> <td> ${playerNames[i][j+5]} </td>`;
        player.setAttribute('style', `color:${color}`);
        newblueTable.append(player);

        const handleMouseOver = (player,i) => {
          document.getElementById(`${player}-${i}`).style.stroke='yellow';
          document.getElementById(`${player}-${i}`).style.transform='scale(1.1)';
          document.getElementById(`${player}-${i}`).style.transitionDuration='.5s';
        }
    
        const handleMouseOut = (player, i) => {
          document.getElementById(`${player}-${i}`).style.stroke='black';
          document.getElementById(`${player}-${i}`).style.transform='scale(1)';
          document.getElementById(`${player}-${i}`).style.transitionDuration='.5s';
        }

        player.addEventListener('mouseenter', () => {
          handleMouseOver(playerNames[i][j], i)
          handleMouseOver(playerNames[i][j+5], i)
        })
        player.addEventListener('mouseleave', () => {
          handleMouseOut(playerNames[i][j], i)
          handleMouseOut(playerNames[i][j+5], i)
        })

      }
      const btnContainer = document.createElement('div');
      btnContainer.setAttribute('class', 'btn-container');
      gameInfo.append(btnContainer);

      //toggle graphs
      let toggleBtn = document.createElement('button');
      toggleBtn.innerHTML = 'Switch Graphs'
      toggleBtn.setAttribute('class', 'switch-graphs');
      gameInfo.append(toggleBtn);
      toggleBtn.addEventListener('click', () => {
        document.getElementById(`gold-graph-${i}`).classList.toggle('hidden');
        document.getElementById(`blueteam${i}`).classList.toggle('hidden');
        document.getElementById(`redteam${i}`).classList.toggle('hidden');
      })
      // winner
      let winner = document.createElement('button');
      gameInfo.append(winner);
      winner.setAttribute('class','winner');
      winner.setAttribute('id',`winner${i}`)
      winner.innerHTML = `Spoilers`;
      gameInfo.appendChild(winner);
      let oldText = null;
      winner.addEventListener('mouseenter', () => {
        oldText = winner.innerHTML;
        winner.innerHTML = winners[i];
      })
      winner.addEventListener('mouseleave', () => {
        winner.innerHTML = oldText;
      })

    }
    // console.log(`data loaded in: ${(Date.now() - start)/1000}s`);
  } // end of async function
} // ending curly brace for class

export default Data;