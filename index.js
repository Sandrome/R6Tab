const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');

app.get('/', function (req, res) {
    res.render('index', {r6tab: null, error: null});
})

app.post('/', function (req, res){
    let siege = req.body.playername;
    let r6url = `https://r6tab.com/api/search.php?platform=uplay&search=${siege}`

    request(r6url, function (err, response, body){
        if(err){
            res.render('index', {r6tab: null,error: 'Error, please try again!'});
        }
        else {
            let r6tab = JSON.parse(body);
            res.json(body);
        }
    });
})

app.listen(process.env.PORT, function(){
    console.log('Example app is listening to the port!')
})