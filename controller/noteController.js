var store = require("../services/note.js");
var qs = require('qs');


module.exports.renderSite = function (req, res) {
    res.render('createNote');
};

module.exports.postData = function (req, res) {
    var title = (req.body.noteTitle);
    var desc = (req.body.noteDescription);
    var imp = (req.body.noteImportance);
    var completed = (req.body.noteDate);
    store.add(title, desc, imp, completed, function (err, newDoc) {
        if(err){
            res.status(err.status || 500);
            res.render('error');
            return;
        }
        res.redirect('/');
    });
};


/*module.exports.renderData = function (req, res) {


 }*/