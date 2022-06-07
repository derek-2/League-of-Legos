class GoldDiff {
  async generateGoldGraph(gameNum, team1, team2, goldDiffy) {

    let goldGraph = document.createElementNS('http://www.w3.org/2000/svg','svg');
    goldGraph.setAttribute('id', `gold-graph-${gameNum}`);
    goldGraph.setAttribute('class', 'gold-graph hidden');
    let graphContainer = document.getElementById(`graph-container-${gameNum}`);
    
    graphContainer.prepend(goldGraph);

    // -------------------------------------------------------

    const svgWidth = 900, svgHeight = 510;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select(`#gold-graph-${gameNum}`)
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
    x.domain(d3.extent(goldDiffy, function (d) { return d.minute }));
    y.domain(d3.extent(goldDiffy, function (d) { return d.goldDiff }));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .append("text")
      .text("Minute")

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
      .datum(goldDiffy)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

}
export default GoldDiff;