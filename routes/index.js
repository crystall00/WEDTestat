var express = require('express');
var data = require('../services/note.js')
var router = express.Router();

router.get('/', function(req, res, next) {

  data.getData(function (err, notes) {

    notedata = {
      notes : notes
    };
    res.render('index', notedata);
  });
});
module.exports = router;
