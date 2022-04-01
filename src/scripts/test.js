document.addEventListener('DOMContentLoaded', function(e){
  let main = document.getElementById('main');
  main.innerHTML = '<p>Hello World </p>';

  
  async function getData(){
    let games = [];
    await d3.csv('./data/matchinfo.csv', function (data) {
      games.push(data);
    })

    let bjerg = [];
    games.forEach(singlegame => {
      if (singlegame['blueMiddle'] === 'Bjergsen' || singlegame['redMiddle'] === 'Bjergsen') {
        bjerg.push(singlegame)
      }
    })
    console.log(bjerg);

    // console.log(games)
    // return games;
  }


  let games = getData();
  // console.log(games)
}
);




