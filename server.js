const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '5931216f620d49d344b751d74ea3dc45';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  })
  
  app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `https://r6tab.com/api/search.php?platform=uplay&search=${city}`

    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.results == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.results.p_name}`;
          res.render('index', {weather: weatherText, error: null});
          //res.json(weather);
        }
      }
    });
  })
  
  app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!')
  })