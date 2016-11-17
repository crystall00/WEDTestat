var store = require("../services/note.js");
var qs = require('qs');

var service = require("../services/note.js");
var reverse = false;
var invisible = false;
var styleChanged = false;
var title = 'Alle Notizen';

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
