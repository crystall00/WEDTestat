var Datastore = require('nedb');
var db = new Datastore({filename: './data/notes.json', autoload: true});

function Note(title, desc, imp, finishedTill, finished){
    this.created = Date.now().toString();
    this.title = title;
    this.description = desc;
    this.importance = imp;
    this.finishedTill = finishedTill;
    this.finished = finished;
}

function addNote(title, desc, imp, finishedTill,finished, callback) {
    var note = new Note(title, desc, imp, finishedTill,finished);
    db.insert(note, function (err, newDoc) {
        if(callback){
            callback(err, newDoc);
        }
    });
}

function getData(callback) {
    db.find({}, callback);
}


function editNoteFunction(id, title, description, importance, finishedTill, finished, callback){
    db.update({_id: id}, {$set: {"title": title, "description": description, "importance": importance, "finishedTill": finishedTill, "finished": finished}}, function(err, doc){
        if(callback){
            callback(err, doc);
        }
    });
}

module.exports = {add : addNote, getData : getData, edit:editNoteFunction};
