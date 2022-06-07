import Data from "./scripts/data"; // import Data class from data.js

window.addEventListener('DOMContentLoaded', (event) => {
  function emptyChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function clearSearchFields(){
    document.getElementById('team1').value='';
    document.getElementById('team2').value='';
    showSpoilersBtn()
  }

  function showSpoilersBtn(){
    document.getElementById('spoilers').classList.remove('hidden');
  }
  
  function handleSearch(){
    let team1 = document.getElementById('team1').value.toUpperCase();
    let team2 = document.getElementById('team2').value.toUpperCase();
    let statsdiv = document.getElementById('stats');

    if (!team1 && !team2){
      alert('enter valid teams!');
    } else {
      emptyChildren(statsdiv);
      new Data(team1, team2);
      clearSearchFields();
    }
  }

  const searchButton = document.getElementById('search-btn');
  searchButton.addEventListener('click', () => {
    handleSearch();
  });

  const firstTeam = document.getElementById('team1');
  const secondTeam = document.getElementById('team2');
  [firstTeam, secondTeam].forEach(searchField => {
    searchField.addEventListener('keypress', function (e){
      if (e.key === 'Enter') handleSearch();
    })
  })

  let spoilerTag = document.getElementById('spoilers');

  spoilerTag.addEventListener('click', function(e){
    let allSpoilers = Array.from(document.getElementsByClassName('winner'));
    for(let j= 0; j<allSpoilers.length; j++){
      allSpoilers[j].classList.toggle('hidden');
    }
  });
  
});