var Datastore = require('nedb');
var db = new Datastore({filename: './data/notes.json', autoload: true});


function Note(title, desc, imp, completed){
    this.title = title;
    this.description = desc;
    this.importance = imp;
    this.finishedTill = completed;
}

function addNote(title, desc, imp, completed, callback) {
    var note = new Note(title, desc, imp, completed);
    db.insert(note, function (err, newDoc) {
        if(callback){
            callback(err, newDoc);
        }
    });
}

function getData(callback) {
    db.find({}, callback);
}

module.exports = {add : addNote, getData : getData};
