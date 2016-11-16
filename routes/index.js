var express = require('express');
var data = require('../services/note.js')
var router = express.Router();


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



module.exports = router;
