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
    let redData = {};
    let blueGold = playerGolds.slice(0,5);
    let redGold = playerGolds.slice(5);
    let blueTotal = blueGold.sum();
    let redTotal = blueGold.sum();

    for (let i =0; i<10; i++){
      if (i < 5){
        blueData[playerNames[i]] = playerGolds[i];
      }
      else {
        redData[playerNames[i]] = playerGolds[i];
      }
    }
    // debugger;
    const width = 450,
      height = 450,
      margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin
    /// -------------------------------------------------------------------------------
    // append the svg object to the div called 'my_dataviz'
    let blueGoldShare = document.createElement('div');
    debugger;
    const svg = d3.select(`#blueteam${i}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create dummy data
    // const data = { a: 9, b: 20, c: 30, d: 8, e: 12 }

    // set the color scale
    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(function (d) { return d[1] })
    const data_ready = pie(Object.entries(blueData))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) { return (color(d.data[0])) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) { debugger;return `${d.data[0]} ${Math.round(d.data[1]/blueTotal*100)}%`})
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
    // debugger;
    const width = 450,
      height = 450,
      margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin
    /// -------------------------------------------------------------------------------
    // append the svg object to the div called 'my_dataviz'
    let redGoldShare = document.createElement('div');
    debugger;
    const svg = d3.select(`#redteam${i}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create dummy data
    // const data = { a: 9, b: 20, c: 30, d: 8, e: 12 }

    // set the color scale
    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(function (d) { return d[1] })
    const data_ready = pie(Object.entries(redData))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d) { return (color(d.data[0])) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d) { debugger; return `${d.data[0]} ${Math.round(d.data[1] / redTotal * 100)}%` })
      .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
      .style("text-anchor", "middle")
      .style("font-size", 17)
  }













}

export default GoldShare;