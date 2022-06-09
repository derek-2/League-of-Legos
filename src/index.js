import Data from "./scripts/data"; // import Data class from data.js

window.addEventListener('DOMContentLoaded', (event) => {
  let statsdiv = document.getElementById('stats');
  function emptyChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  document.getElementById('logo-container').addEventListener('click', () => {
    const stats = document.getElementById('stats');
    emptyChildren(stats);
    document.getElementById('help').classList.toggle('hidden');

    const modalContainerInitial = document.createElement('div');
    stats.append(modalContainerInitial);
    modalContainerInitial.setAttribute('id', 'modal-container-initial');

    const modalTextInitial = document.createElement('div');
    modalTextInitial.setAttribute('class', 'modal-text initial');

    const nonText = document.createElement('div');
    nonText.setAttribute('class', 'non-text');
    const h1 = document.createElement('h1');
    h1.innerHTML = 'How to use';
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Recommendations';
    const p1 = document.createElement('p');
    p1.innerHTML = 'League of Legends is a 5v5 team game. League of Legos takes a look at all professional games played between the 2015 and 2018 seasons.'
    const p2 = document.createElement('p');
    p2.innerHTML = 'Each player acrues gold throughout the game and League of Legos allows you to look at the individual stats for each player throughout each game.';
    const p3 = document.createElement('p');
    p3.innerHTML = 'If you don\'t know any specific head to head matches, you can always search with just one team! If you do, you can pull up all matches played between two teams in their respective blue/red side.'
    const img = document.createElement('img');
    img.setAttribute('src', './src/assets/da-rift.jpg');
    img.setAttribute('alt', 'summoner\'s rift');
    img.setAttribute('id', 'sr');
    const div = document.createElement('div');
    const key = document.createElement('key');
    key.setAttribute('id', 'key');
    const key1 = document.createElement('p');
    key1.innerHTML = '<span class="color-box" id="green"> </span>&nbsp;> 300 Games';
    const key2 = document.createElement('p');
    key2.innerHTML = '<span class="color-box" id="yellow"></span>&nbsp;> 100 Games';
    const key3 = document.createElement('p');
    key3.innerHTML = '<span class="color-box" id="orange"></span>&nbsp;> 50 Games';
    const teamsListContainer = document.createElement('div');
    teamsListContainer.setAttribute('class', 'teams-list-container');
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'teams-list-initial');
    ul.setAttribute('class', 'teams-list');

    stats.append(modalContainerInitial);
    modalContainerInitial.append(modalTextInitial);
    modalTextInitial.append(h1);
    modalTextInitial.append(p1);
    modalTextInitial.append(p2);
    modalTextInitial.append(p3);
    modalTextInitial.append(nonText);
    nonText.append(img);
    nonText.append(h2);
    nonText.append(div);
    div.append(teamsListContainer);
    teamsListContainer.append(ul);

    fetchTeams(document.getElementById('teams-list-initial'));
    div.append(key);
    key.append(key1);
    key.append(key2);
    key.append(key3);
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
  
  function fetchTeams(parent1, parent2){
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
        let ele1 = document.createElement('li');

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
        ele1.setAttribute('class', className);


        ele1.addEventListener('click', () => {
          navigator.clipboard.writeText(ele1.innerHTML);
          document.getElementById('clipboard-message').classList.toggle('visible');
          setTimeout(() => {
            document.getElementById('clipboard-message').classList.toggle('visible');
          }, 5000)
        })

        let text1 = document.createTextNode(team);

        ele1.appendChild(text1);

        parent1.append(ele1)

        if (parent2){
          let ele2 = document.createElement('li');
          ele2.setAttribute('class', className);

          ele2.addEventListener('click', () => {
            navigator.clipboard.writeText(ele2.innerHTML);
            document.getElementById('clipboard-message').classList.toggle('visible');
            setTimeout(() => {
              document.getElementById('clipboard-message').classList.toggle('visible');
            }, 5000)
          })
          let text2 = document.createTextNode(team);
          ele2.appendChild(text2);
          parent2.append(ele2)
        }

      })
    })
  }

  fetchTeams(document.getElementById('teams-list-initial'), document.getElementById('teams-list'));

});