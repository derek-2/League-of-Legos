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
    
    // let blueGoldShare = document.createElement('div');

    const svg = d3.select(`#blueteam${i}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);

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
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) { return `${d.data[0]} ${Math.round(d.data[1]/blueTotal*100)}%`})
      .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
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
    /// -------------------------------------------------------------------------------

    // let redGoldShare = document.createElement('div');

    const svg = d3.select(`#redteam${i}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);

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
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) { return `${d.data[0]} ${Math.round(d.data[1] / redTotal * 100)}%` })
      .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
      .style("text-anchor", "middle")
      .style("font-size", 17)
  }

}

export default GoldShare;