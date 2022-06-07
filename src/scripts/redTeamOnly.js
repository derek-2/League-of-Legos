import RedOnlyGoldShare from "./redOnlyGoldShare";

Array.prototype.sum = function () {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += this[i];
  }
  return sum;
}
export default class RedTeamOnly {
  constructor(team2){
    this.team2 = team2;
    // call function passing in team2
    this.generateAllMatchesForRed(team2);
  }

  async generateAllMatchesForRed(team2){
    let matchInfo = [];
    let blueWins = 0;
    let redWins = 0;
    let allblueBans = [];
    let allredBans = [];
    let championNames = [];
    let playerNames = [];
    let playerGolds = [];
    let goldDiffy = [];
    let blueTeamTags = [];
    let winners = [];

    await d3.csv('./src/data/LeagueofLegends.csv', function (d){

      if (d.redTeamTag === team2){

        blueTeamTags.push(d.blueTeamTag);

        matchInfo.push([d.Year, d.Season, d.Type, d.League]);
        if (parseInt(d.bResult) === 1){
          blueWins += 1;
          winners.push(d.blueTeamTag);
        } else {
          redWins += 1;
          winners.push(d.redTeamTag);
        }
        let parsedBlueBans = d.blueBans.slice(1,d.blueBans.length-1).replaceAll("'","").split(",");
        let parsedRedBans = d.redBans.slice(1,d.redBans.length-1).replaceAll("'","").split(",");

        allblueBans.push(parsedBlueBans);
        allredBans.push(parsedRedBans);

        championNames.push([d.blueTopChamp, d.blueJungleChamp, d.blueMiddleChamp, d.blueADCChamp, d.blueSupportChamp, d.redTopChamp, d.redJungleChamp, d.redMiddleChamp, d.redADCChamp, d.redSupportChamp]);

        playerNames.push([d.blueTop, d.blueJungle, d.blueMiddle, d.blueADC, d.blueSupport, d.redTop, d.redJungle, d.redMiddle, d.redADC, d.redSupport]);

        let idx = JSON.parse(d.goldblueTop).length - 1; // gets the idx for last minute of the game

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

        let goldDiff = JSON.parse(d.golddiff).map((ele,idx)=> {
          return {
            minute: idx,
            goldDiff: ele
          };
        })
        goldDiffy.push(goldDiff);
      }

    }); // end of await, all data is now stored in a variable

    let headtohead = document.getElementById('overall-record');
    headtohead.innerHTML = `${blueWins} - ${redWins} ${team2}`;

    let statsdiv = document.getElementById('stats');

    for (let i = 0; i < playerNames.length; i++){
      // time to iterate through each game
      let gameInfo = document.createElement('div');
      gameInfo.setAttribute('id', `game-${i}`);
      gameInfo.setAttribute('class', 'game-info');
      statsdiv.append(gameInfo);





      let bluePlayers = document.createElement('div');
      let blueTeamLabel = document.createElement('h2');
      blueTeamLabel.innerText = `${blueTeamTags[i]}`;
      bluePlayers.setAttribute('id', `blueteam${i}`);
      bluePlayers.setAttribute('class', 'players-container blue');
      bluePlayers.append(blueTeamLabel);

      let redPlayers = document.createElement('div');
      let redteamLabel = document.createElement('h2');
      redteamLabel.innerText = team2;
      redPlayers.setAttribute('id', `redteam${i}`);
      redPlayers.setAttribute('class', 'players-container red');
      redPlayers.append(redteamLabel);

      gameInfo.append(bluePlayers);
      gameInfo.append(redPlayers);


      let blueattach = document.getElementById(`blueteam${i}`);
      let redattach = document.getElementById(`redteam${i}`);
      let blueBans = document.createElement('p');
      let redBans = document.createElement('p');

      blueattach.append(blueBans);
      redattach.append(redBans);
      
      blueBans.innerHTML = `<b>Bans:</b> ${allblueBans[i].join(", ")}`;
      redBans.innerHTML = `<b>Bans:</b> ${allredBans[i].join(", ")}`;


      // generating match info
      let container = document.getElementById(`game-${i}`);
      let generalMatchInfo = document.createElement('p');
      generalMatchInfo.innerHTML = `${matchInfo[i][0]} ${matchInfo[i][1]} ${matchInfo[i][2]} ${matchInfo[i][3]}`;
      container.prepend(generalMatchInfo);

      // gold difference chart
      let goldGraph = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      goldGraph.setAttribute('id', `gold-graph-${i}`);
      goldGraph.setAttribute('class', 'gold-graph');
      let gameInfoContainer = document.getElementById(`game-${i}`);

      gameInfoContainer.append(goldGraph);

      const svgWidth = 400, svgHeight = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;

      const svg = d3.select(`#gold-graph-${i}`)
        .attr("width", svgWidth)
        .attr("height", svgHeight);

      const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const x = d3.scaleLinear()
        .rangeRound([0, width]);

      const y = d3.scaleLinear()
        .rangeRound([height, 0]);

      const line = d3.line()
        .x(function (d) { return x(d.minute) })
        .y(function (d) { return y(d.goldDiff) })
      x.domain(d3.extent(goldDiffy[i], function (d) { return d.minute }));
      y.domain(d3.extent(goldDiffy[i], function (d) { return d.goldDiff }));

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .append("text")
        .text("Minute");

      g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Gold Difference");

      g.append("path")
        .datum(goldDiffy[i])
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
      // end of gold diff

      // start of gold share charts
      let newGoldShare = new RedOnlyGoldShare(i, playerNames[i], playerGolds[i]);
      newGoldShare.generateGoldShare(i, playerNames[i], playerGolds[i]);
      newGoldShare.generateGoldShare2(i, playerNames[i], playerGolds[i]);


      // add info about each player's name, champ, and gold at the end of the game

      // create table for each game
      let newblueTable = document.createElement('table');
      newblueTable.setAttribute('class','playerinfotable');
      let newredTable = document.createElement('table');
      newredTable.setAttribute('class','playerinfotable');
      bluePlayers.append(newblueTable);
      redPlayers.append(newredTable);

      let newRow1 = document.createElement('tr');
      newRow1.innerHTML ='<tr><th><b>Role</b></th><th><b>Player Name</b></th><th><b>Champion Name</b></th><th><b>Gold</b></th></tr>';
      newblueTable.append(newRow1);
      let newRow2 = document.createElement('tr');
      newRow2.innerHTML = '<tr><th><b>Role</b></th><th><b>Player Name</b></th><th><b>Champion Name</b></th><th><b>Gold</b></th></tr>';
      newredTable.append(newRow2);

      for (let j = 0; j< playerNames[i].length; j++){
        let role,color;
        switch(j%5){
          case 0: role = 'Top'; color = '#66c2a5'; break;
          case 1: role = 'Jungle'; color = '#fc8d62'; break;
          case 2: role = 'Mid'; color = '#8da0cb'; break;
          case 3: role = 'ADC'; color = '#e78ac3'; break;
          case 4: role = 'Support'; color = '#a6d854'; break;
        }

        let player = document.createElement('tr');
        player.innerHTML = `<td> ${role} </td> <td> ${playerNames[i][j]} </td> <td> ${championNames[i][j]} </td> <td> ${playerGolds[i][j]} </td> `;
        player.setAttribute('style',`color:${color}`);
        if (j < 5){
          newblueTable.append(player);
        } else {
          newredTable.append(player);
        }
      }
      let winner = document.createElement('h2');
      winner.setAttribute('class', 'winner hidden');
      winner.setAttribute('id', `Winner: winner${i}}`);
      winner.innerHTML = winners[i];
      gameInfo.append(winner);



    } // end of iterating through each game

  } //end of async




}