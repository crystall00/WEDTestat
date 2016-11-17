var express = require('express');
var data = require('../services/note.js')
var router = express.Router();


//var notes = require('../controller/noteController.js');
/*
/* GET home page. */

router.get('/', function(req, res, next) {

  data.getData(function (err, notes) {

    //WICHTIG: um render Daten mitzugeben, muss man ihn im zweiten Param. mitgeben
    //notes ist ein array und wird darum in ein neues objekt mit dem gleichen namen gespeichert, damit man cookies oder sonst was auch nocht
    //ins object speichern kann
    notedata = {
      notes : notes
    };
    res.render('index', notedata);
  });
});

/*
let settings = {
  orderBy: 'finish',
  sort: false,
  state: false
};

router.use((req, res, next)=>{
  if(req.cookies.settings){
    settings = JSON.parse(req.cookies.settings);
  }
  next();
});



router.get('/', function(req, res) {

  res.charset = 'utf-8';
  const querySettings = {
    orderBy: req.query.orderBy,
    sort: req.query.sort == 'true',
    state: req.query.state ? req.query.state == 'true' : undefined
  };

  setOptions(querySettings, res);


  data.getData(settings, function (err, notes) {

    noteData = {
      notes : notes,
      settings: settings
    };
    res.render('index', noteData);
  });
});

function setOptions(querySettings, res){
  settings = {
    orderBy: querySettings.orderBy === undefined ? settings.orderBy : querySettings.orderBy,
    sort: querySettings.sort === undefined ? settings.sort : querySettings.sort,
    state: querySettings.state === undefined ? settings.state : querySettings.state
  };

  res.cookie('settings', JSON.stringify(settings));
}

*/
module.exports = router;
