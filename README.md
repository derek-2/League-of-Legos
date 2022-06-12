# NALeague
## Background

League of Legends is a team-based 5 vs 5 game between the blue and red team. League of Legos shows data on all professional games played between the 2015 to 2018 seasons. 

![image](https://user-images.githubusercontent.com/59910096/173247738-4016f5f6-86ff-4f81-b7d9-a01f4db8bf38.png)

## Functionality & MVPs

- In League of Legos, users will be able to:

- Search for a specific team
    - Entering a specific team into either the blue team or red team while leaving the other blank will pull up all games played by that team on a specific side. If a user does not know any teams to search for, there is a list of teams that users can pick from that have played more than 50 games. The list of teams are colored according to how many games that team has played over the course of four years. Clicking on one of the teams saves the text to the user's clipboard to easily search for them. The how to is visibile when you are on the home page, but turns into a modal button once the user has inputted a search request. The how to modal also gives the user some basic information about League of Legends if they have never played the game.

![modalsearch-one-team](https://user-images.githubusercontent.com/59910096/173247759-5b966c49-2516-4713-92b8-0f18f47ca619.gif)
    - Depending on whether a user entered teams for both fields or only one, I had to filter the results based on a few conditionals. I decided to put all the conditionals in one fetch request because it sped up the loading speed drastically. If one specific match met the conditional, I get and format all the data needed to show users.

```javascript
(((team1 && team2) && (team1 === d.blueTeamTag && team2 === d.redTeamTag)) ||
((team1 && !team2) && (team1 === d.blueTeamTag)) || 
((team2 && !team1) && team2 === d.redTeamTag))
```

- Generate general information about the league
    - Users will see all games played based on what they searched. Once the search has completed, each game will have a gold share chart for the blue and red team for that match and there will be a table showing the player name, character played, and gold amount by the end of the game. Hovering one row of the table or one slice of the gold share chart highlights that specific slice of the gold share chart. Clicking a highlighed slice of the gold share chart switches the content of pie chart to the player name. There are some more general information about the game such as the type of game played (spring season/summer season/world championship), team names, and what characters each team banned.
![search](https://user-images.githubusercontent.com/59910096/173248233-4af1680d-8817-4935-ab22-5e837e0c48b9.gif)
```javascript
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
```

- Generate a gold difference chart for any specific match
    - For each match, there is a switch graphs button, which alls users to swap back and forth between the gold share charts and the gold difference chart. In the initial fetch request, the data was formated in a particular way so that the d3 library could read it and convert it into graphs. There is also a spoiler button that users can hover over the see who won the match.

```javascript
blueGold.push(JSON.parse(d.goldblueTop)[idx]);
        blueGold.push(JSON.parse(d.goldblueJungle)[idx]);
        blueGold.push(JSON.parse(d.goldblueMiddle)[idx]);
        blueGold.push(JSON.parse(d.goldblueADC)[idx]);
        blueGold.push(JSON.parse(d.goldblueSupport)[idx]);

        redGold.push(JSON.parse(d.goldredTop)[idx]);
        redGold.push(JSON.parse(d.goldredJungle)[idx]);
        redGold.push(JSON.parse(d.goldredMiddle)[idx]);
        redGold.push(JSON.parse(d.goldredADC)[idx]);
        redGold.push(JSON.parse(d.goldredSupport)[idx]);

        playerGolds.push(blueGold.concat(redGold));
```
```javascript
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
```
![spoilersswitch-graphs](https://user-images.githubusercontent.com/59910096/173248575-2ee2a1c5-9e67-4444-b182-2c086818701e.gif)

## Technologies, Libraries, APIs

- d3 library to render data
- Webpack to bundle and transpile the source JavaScript code.
- npm to manage project dependencies.

## Implementation Timeline

- Friday Afternoon & Weekend: Get familiar with d3 and practice how to access the data.

- Monday: Using the data parsed from the csv file, create charts for a specific player and team.

- Tuesday: Work on search feature to dynamically load data.

- Wednesday: Make website look more presentable by adding css to website and styling charts in d3.

- Thursday Morning: Finalize project and deploy.
