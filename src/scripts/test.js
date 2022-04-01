document.addEventListener('DOMContentLoaded', function(e){
  let main = document.getElementById('main');
  main.innerHTML = '<p>Hello World </p>';

  
  async function getData(){
    let games = [];
    await d3.csv('./data/LeagueofLegends.csv', function (data) {
      if ((data.blueTeamTag === 'TSM' || data.redTeamTag === 'TSM') && (data.blueTeamTag === 'C9' || data.redTeamTag === 'C9')){
        games.push(data.golddiff);
      }
    });
    console.log(games[0]);
    console.log(games.length);


  }


  let games = getData();
  return games;
  // console.log(games)
}
);




