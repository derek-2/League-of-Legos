import Data from "./scripts/data"; // import Data class from data.js

window.addEventListener('DOMContentLoaded', (event) => {
  let statsdiv = document.getElementById('stats');
  function emptyChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  document.getElementById('logo-container').addEventListener('click', () => {
    emptyChildren(statsdiv);
  })

  const topnav = document.getElementById('top-nav');
    function check() {
      if (window.scrollY === 0) {
        topnav.classList.remove("not-top");
      } else {
        topnav.classList.add("not-top");
      }
    }
    window.addEventListener("scroll", check);
    window.addEventListener("load", check);

  function clearSearchFields(){
    document.getElementById('team1').value='';
    document.getElementById('team2').value='';
  }
  
  function handleSearch(){
    let team1 = document.getElementById('team1').value.toUpperCase();
    let team2 = document.getElementById('team2').value.toUpperCase();
    let helpBtn = document.getElementById('help');

    if (!team1 && !team2){
      alert('enter valid teams!');
    } else {
      emptyChildren(statsdiv);
      new Data(team1, team2);
      clearSearchFields();
      helpBtn.classList.remove('hidden');
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

  const helpButton = document.getElementById('help');
  const modalBackground = document.getElementById('modal-background');
  const closeButton = document.getElementById('close-modal');
  [helpButton, modalBackground, closeButton].forEach(ele => {
    ele.addEventListener('click', function(e){
      document.getElementById('modal-container').classList.toggle('hidden');
    });
  })
  

    let teams = {};
    d3.csv('../../../../src/data/LeagueofLegends.csv', function(d){
      if (typeof teams[d.blueTeamTag] === 'undefined'){
        teams[d.blueTeamTag.toUpperCase()] = 0;
      } else { teams[d.blueTeamTag.toUpperCase()] += 1}
      if (typeof teams[d.redTeamTag] === 'undefined'){
        teams[d.redTeamTag.toUpperCase()] = 0;
      } else { teams[d.redTeamTag.toUpperCase()] += 1}
    }).then(() => {
      const arr = Object.keys(teams).filter(team => teams[team] > 50);
      arr.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
      arr.forEach(team => {
        let temp = document.createElement('li');
        let temp2 = document.createElement('li');
        let className;
        let gamesPlayed = teams[team];
        switch(true){
          case (gamesPlayed > 300):
            className = 'most-games'; break;
          case (gamesPlayed > 100):
            className = 'average-games'; break;
          case (gamesPlayed > 50):
            className = 'below-average-games'; break;
          default:
            className = 'few-games'; break;
        }
        temp.setAttribute('class', className);
        temp2.setAttribute('class', className);
        temp.addEventListener('click', () => {
          navigator.clipboard.writeText(temp.innerHTML);
          document.getElementById('clipboard-message').classList.toggle('visible');
          setTimeout(() => {
            document.getElementById('clipboard-message').classList.toggle('visible');
          }, 5000)
        })
        let word = document.createTextNode(team);
        let word2 = document.createTextNode(team);
        temp.appendChild(word);
        temp2.appendChild(word2);

        document.getElementById('teams-list-initial').append(temp)
        document.getElementById('teams-list').append(temp2);
      })
    })


  
});