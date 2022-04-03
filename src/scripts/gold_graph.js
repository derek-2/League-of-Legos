class GoldGraph {
  constructor(team1, team2){
    console.log('hello');
    this.team1 = team1;
    this.team2 = team2;
    this.generateGoldGraph(team1, team2);
  }

  async generateGoldGraph(team1, team2){
    // console.log('me generate gold graph!!!');

    let goldDiffy = [];
    let playerNames = []; // blue players, red players
    let championNames = []; // blue champions, red champions
    let bans = []; // blue bans, red bans

    await d3.csv('../../data/LeagueofLegends.csv', function(d){
      if ((d.blueTeamTag === team1 || d.redTeamTag === team1) && 
      (d.blueTeamTag === team2 || d.redTeamTag === team2)) {
        // get gold diff data
        goldDiffy.push(d.golddiff);

        // get player names of both teams
        playerNames.push([d.blueTop, d.blueJungle, d.blueMiddle, d.blueADC, d.blueSupport,d.redTop, d.redJungle, d.redMiddle, d.redADC, d.redSupport]);

        // get champion names of both teams
        championNames.push([d.blueTopChamp, d.blueJungleChamp, d.blueMiddleChamp, d.blueADCChamp, d.blueSupportChamp,d.redTopChamp, d.redJungleChamp, d.redMiddleChamp, d.redADCChamp, d.redSupportChamp]);

        // get bans of both teams
        let blueBans = d.blueBans.slice(1,d.blueBans.length-1).replaceAll("'","").split(",");
        blueBans = blueBans.map(ban => ban.trim());
        let redBans = d.redBans.slice(1,d.redBans.length-1).replaceAll("'","").split(",");
        redBans = redBans.map(ban => ban.trim());

        bans.push(blueBans.concat(redBans));
      }
    });
    // bans[0].forEach(champ => console.log(champ, champ.length));
    console.log(bans);
    // console.log(playerNames);
    // console.log(goldDiffy.length);



  } // end of async function







} // ending curly brace for class
export default GoldGraph;