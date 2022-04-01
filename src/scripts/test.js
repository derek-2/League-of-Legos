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

    const dataArr = [5, 30, 50, 60];
    const width = 500;
    const height = 51 * dataArr.length;

    const canvas = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const scaleWidth = d3.scaleLinear()
      .domain([0, 60])
      .range([0, width])

    const bars = canvas.selectAll('rect')
      .data(dataArr)
      .enter()
      .append('rect')
      .attr('width', function (d) { return scaleWidth(d) })
      .attr('height', function (d) { return 50 })
      .attr('fill', 'black')
      .attr('y', function (d, i) { return i * 51 })
  }


  let games = getData();
  return games;
  // console.log(games)
}
);

