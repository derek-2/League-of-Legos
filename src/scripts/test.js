document.addEventListener('DOMContentLoaded', function(e){
  let main = document.getElementById('main');
  main.innerHTML = '<p>Hello World </p>';
});

let game = [];
d3.csv('./data/matchinfo.csv', function (res) {
  // console.log(res);
  // res.json();
  // debugger;
  game.push(res);
  console.log(game);
})