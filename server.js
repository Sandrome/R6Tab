const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {player: null, error: null});
  })
  
  app.post('/', function (req, res) {
    let siege_name = req.body.siege_player;
    let url = `https://r6tab.com/api/search.php?platform=uplay&search=${siege_name}`

    request(url, function (err, response, body) {
      if(err){
        res.render('player_details', {player: null, error: 'There is some error! Please try again :)'});
      } else {
        let player = JSON.parse(body)
        if(player.results == undefined){
          res.render('player_details', {player: null, error: 'Error, Player does not exist'});
        } else {
          let playerText = `It's ${player.results[0].p_name}`;
          res.render('player_details', {player: playerText, error: null});
          //res.json(player);
        }
      }
    });
  })
  
  app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!')
  })