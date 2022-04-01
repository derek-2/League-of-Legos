class GoldGraph {
  constructor(team1, team2){
    console.log('hello');
    this.team1 = team1;
    this.team2 = team2;
    // debugger;
    this.generateGoldGraph(team1, team2);
    debugger;
  }

  async generateGoldGraph(team1, team2){
    console.log('me generate gold graph!!!');
    let goldDiffy = [];
    await d3.csv('../../data/LeagueofLegends.csv', function(d){
      debugger;
      if ((d.blueTeamTag === team1 || d.redTeamTag === team1) && 
      (d.blueTeamTag === team2 || d.redTeamTag === team2)) {
        goldDiffy.push(d.golddiff);
      }
    });

    console.log(goldDiffy.length);



  }




}

export default GoldGraph;