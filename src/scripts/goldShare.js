Array.prototype.sum = function () {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += this[i];
  }
  return sum;
}
class GoldShare {
  constructor(i, playerNames, playerGolds){
    this.generateGoldShare(i, playerNames, playerGolds);
    this.generateGoldShare2(i, playerNames, playerGolds);
  }

  generateGoldShare(i, playerNames, playerGolds){
    let blueData = {};
    let blueGold = playerGolds.slice(0,5);
    let blueTotal = blueGold.sum();

    for (let i =0; i<5; i++){
      blueData[playerNames[i]] = playerGolds[i];
    }

    const width = 450;
    const height = 450;
    const margin = 40;

    const radius = Math.min(width, height) / 2 - margin

    const svg = d3.select(`#blueteam${i}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .range(['#AC92EB' ,'#4FC1E8' , '#A0D568', '#FFCE54', '#ED5564']);

    const pie = d3.pie()
      .value(function (d) { return d[1] })
    const data_ready = pie(Object.entries(blueData))

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) { return (color(d.data[0])) })
      .attr("id", function(d) {return `${d.data[0]}-${i}`})
      .attr("class", () => 'pie-chart')
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

      //player gold share percentage text
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) { return `${Math.round(d.data[1]/blueTotal*100)}%`})
      .attr("id", function(d) {return `${d.data[0]}-${i}-percentage`})
      .attr("class", () => 'pie-chart')
      .attr("transform", function (d) { 
        let pos = arcGenerator.centroid(d);
        pos[0]*=1.3;
        pos[1]*=1.3;
        return `translate(${pos})` })
      .style("text-anchor", "middle")
      .style("font-size", 17)

      //player name text
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) {return `${d.data[0]}`})
      .attr("id", function(d) {return `${d.data[0]}-${i}-nametag`})
      .attr("transform", function (d) { 
        let pos = arcGenerator.centroid(d);
        pos[0]*=1.3;
        pos[1]*=1.3;
        return `translate(${pos})` })
      .attr("class", () => 'pie-chart hidden')
      .style("text-anchor", "middle")
      .style("font-size", 17)

  }

  generateGoldShare2(i, playerNames, playerGolds) {
    let redData = {};
    let redGold = playerGolds.slice(5);
    let redTotal = redGold.sum();

    for (let i = 0; i < 10; i++) {
      if (i >= 5) {
        redData[playerNames[i]] = playerGolds[i];
      }
    }

    const width = 450;
    const height = 450;
    const margin = 40;

    const radius = Math.min(width, height) / 2 - margin

    const svg = d3.select(`#redteam${i}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const color = d3.scaleOrdinal()
      .range(['#AC92EB' ,'#4FC1E8' , '#A0D568', '#FFCE54', '#ED5564']);

    const pie = d3.pie()
      .value(function (d) { return d[1] })
    const data_ready = pie(Object.entries(redData))

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) { return (color(d.data[0])) })
      .attr("id", function(d) {return `${d.data[0]}-${i}`})
      .attr("class", () => 'pie-chart')
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

      //player gold share percentage text
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) { return `${Math.round(d.data[1] / redTotal * 100)}%` })
      .attr("transform", function (d) { 
        let pos = arcGenerator.centroid(d);
        pos[0]*=1.3;
        pos[1]*=1.3;
        return `translate(${pos})` })
      .attr("id", function(d) {return `${d.data[0]}-${i}-percentage`})
      .attr("class", () => 'pie-chart')
      .style("text-anchor", "middle")
      .style("font-size", 17)
      
      //player name text
      svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) { return `${d.data[0]}`})
      .attr("id", function(d) {return `${d.data[0]}-${i}-nametag`})
      .attr("transform", function (d) { 
        let pos = arcGenerator.centroid(d);
        pos[0]*=1.3;
        pos[1]*=1.3;
        return `translate(${pos})` })
      .attr("class", () => 'pie-chart hidden')
      .style("text-anchor", "middle")
      .style("font-size", 17)
      

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

    const handleClick = (player, i) => {
      document.getElementById(`${player}-${i}-nametag`).classList.toggle('hidden');
      document.getElementById(`${player}-${i}-percentage`).classList.toggle('hidden');
    }

      playerNames.forEach(player => {
        document.getElementById(`${player}-${i}`).addEventListener('mouseenter', () => {
          handleMouseOver(player,i)
        })
        document.getElementById(`${player}-${i}-percentage`).addEventListener('mouseenter', () => {
          handleMouseOver(player,i)
        })
        document.getElementById(`${player}-${i}-nametag`).addEventListener('mouseenter', () => {
          handleMouseOver(player,i)
        })
        document.getElementById(`${player}-${i}`).addEventListener('mouseleave', () => {
          handleMouseOut(player,i)
        })

        document.getElementById(`${player}-${i}`).addEventListener('click', () => {
          handleClick(player, i);
        })
        document.getElementById(`${player}-${i}-percentage`).addEventListener('click', () => {
          handleClick(player, i);
        })
        document.getElementById(`${player}-${i}-nametag`).addEventListener('click', () => {
          handleClick(player, i);
        })



    })
  }

}

export default GoldShare;