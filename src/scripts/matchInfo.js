class MatchInfo {
  async getMatchInfo(gameNum, team1, team2, matchInfo) {

    let container = document.getElementById(`game-${gameNum}`);
    let generalMatchInfo = document.createElement('p');

    generalMatchInfo.innerHTML = `${matchInfo[gameNum][0]} ${matchInfo[gameNum][1]} ${matchInfo[gameNum][2]} ${matchInfo[gameNum][3]}`;
    container.prepend(generalMatchInfo);
  }
}
export default MatchInfo;