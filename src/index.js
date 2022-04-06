import Data from "./scripts/data"; // import Data class from data.js
import RedTeamOnly from "./scripts/redTeamOnly";

window.addEventListener('DOMContentLoaded', (event) => {
  function emptyChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  let statsdiv = document.getElementById('stats');
  console.log('hello');
  const searchButton = document.getElementById('search-btn');
  searchButton.addEventListener('click', () => {
    // get input values
    let team1 = document.getElementById('team1').value.toUpperCase();
    let team2 = document.getElementById('team2').value.toUpperCase();
    // debugger;
    if (!team1 && !team2){
      alert('enter valid teams!');
    }
    else if (team1){
      // console.log('in else if');
      emptyChildren(statsdiv);
      let request = new Data(team1, team2);
    }
    else {
      emptyChildren(statsdiv)
      // console.log('only search red team!');
      let request = new RedTeamOnly(team2);
    }
  });

  const firstTeam = document.getElementById('team1');
  const secondTeam = document.getElementById('team2');
  firstTeam.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
      emptyChildren(statsdiv);
      let team1 = document.getElementById('team1').value.toUpperCase();
      let team2 = document.getElementById('team2').value.toUpperCase();
      if (!team1 && !team2) {
        alert('enter valid teams!');
      }
      else if (team1) {
        // console.log('in else if');
        emptyChildren(statsdiv);
        let request = new Data(team1, team2);
      }
      else {
        emptyChildren(statsdiv)
        // console.log('only search red team!');
        let request = new RedTeamOnly(team2);
      }
    }
  });
  secondTeam.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
      emptyChildren(statsdiv);
      let team1 = document.getElementById('team1').value.toUpperCase();
      let team2 = document.getElementById('team2').value.toUpperCase();
      if (!team1 && !team2) {
        alert('enter valid teams!');
      }
      else if (team1) {
        // console.log('in else if');
        emptyChildren(statsdiv);
        let request = new Data(team1, team2);
      }
      else {
        emptyChildren(statsdiv)
        // console.log('only search red team!');
        let request = new RedTeamOnly(team2);
      }
    }
  });
  
});