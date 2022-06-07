class MatchInfo {
  constructor(gameNum, team1, team2) {
    this.gameNum = gameNum;
    this.team1 = team1;
    this.team2 = team2;
    // this.getMatchInfo(gameNum, team1, team2);
  }

  async getMatchInfo(gameNum, team1, team2) {
    let matchInfo = [];
    await d3.csv('./src/data/LeagueofLegends.csv', function (d) {
      if ((d.blueTeamTag === team1 && !team2) || (d.blueTeamTag === team1 && d.redTeamTag === team2)) {
        matchInfo.push([d.Year, d.Season, d.Type, d.League]);
      }


    });

    let container = document.getElementById(`game-${gameNum}`);
    // have to call getMatchInfo before the data b/c formating
    // or we can just try to prepend it instead of appending
    let generalMatchInfo = document.createElement('p');

      generalMatchInfo.innerHTML = `${matchInfo[gameNum][0]} ${matchInfo[gameNum][1]} ${matchInfo[gameNum][2]} ${matchInfo[gameNum][3]}`;
      container.prepend(generalMatchInfo);
    
  }


}
export default MatchInfo;