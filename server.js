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
    let city = req.body.siege_player;
    let url = `https://r6tab.com/api/search.php?platform=uplay&search=${siege_player}`

    request(url, function (err, response, body) {
      if(err){
        res.render('index', {player: null, error: 'Error, please try again'});
      } else {
        let player = JSON.parse(body)
        if(player.results == undefined){
          res.render('index', {player: null, error: 'Error, please try again'});
        } else {
          let playerText = `It's ${player.results[0].p_name}`;
          res.render('index', {player: playerText, error: null});
          //res.json(player);
        }
      }
    });
  })
  
  app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!')
  })