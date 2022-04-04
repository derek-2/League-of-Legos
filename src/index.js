import Data from "./scripts/data"; // import Data class from data.js


window.addEventListener('DOMContentLoaded', (event) => {
  console.log('hello');
  const searchButton = document.getElementById('search-btn');
  searchButton.addEventListener('click', () => {
    let team1 = document.getElementById('team1').value.toUpperCase();
    let team2 = document.getElementById('team2').value.toUpperCase();
    if (!team1 || !team2){
      alert('enter valid teams!');
    }
    else {
      let request = new Data(team1, team2);
    }
  });

  const secondTeam = document.getElementById('team2');
  secondTeam.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
      let team1 = document.getElementById('team1').value.toUpperCase();
      let team2 = document.getElementById('team2').value.toUpperCase();
      let request = new Data(team1, team2);
    }
  });
  const firstTeam = document.getElementById('team1');
  firstTeam.addEventListener('keypress', function (e){
    if (e.key === 'Enter'){
      let team1 = document.getElementById('team1').value.toUpperCase();
      let team2 = document.getElementById('team2').value.toUpperCase();
      let request = new Data(team1, team2);
    }
  });
  
});


// let test = new Data("TSM", "SSW");