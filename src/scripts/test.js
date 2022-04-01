document.addEventListener('DOMContentLoaded', function(e){
  let main = document.getElementById('main');
  main.innerHTML = '<p>Hello World </p>';
});

let games = [];
d3.csv('./data/matchinfo.csv', function (res) {
  games.push(res);
  console.log(res);
})
console.log(games.length);

// debugger;
let bjerg = [];
games.forEach(singlegame => {
  // debugger;
  if (singlegame['blueMiddle'] === 'Bjergsen' || singlegame['redMiddle'] === 'Bjergsen') {
    bjerg.push(singlegame)
  }
})
// console.log(bjerg);