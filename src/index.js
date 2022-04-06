import Data from "./scripts/data"; // import Data class from data.js

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
    
    if (!team1){
      alert('enter valid teams!');
    }
    else {
      emptyChildren(statsdiv);
      let request = new Data(team1, team2);
    }
  });

  const firstTeam = document.getElementById('team1');
  const secondTeam = document.getElementById('team2');
  firstTeam.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
      emptyChildren(statsdiv);
      let team1 = document.getElementById('team1').value.toUpperCase();
      let team2 = document.getElementById('team2').value.toUpperCase();
      let request = new Data(team1, team2);
    }
  });
  secondTeam.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
      emptyChildren(statsdiv);
      let team1 = document.getElementById('team1').value.toUpperCase();
      let team2 = document.getElementById('team2').value.toUpperCase();
      let request = new Data(team1, team2);
    }
  });
  
});