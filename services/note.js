var Datastore = require('nedb');
var db = new Datastore({filename: './data/notes.json', autoload: true});

function Note(noteTitle, description, importance, finishedTill, finished)
{
    this.created = Date.now().toString();
    this.noteTitle = noteTitle;
    this.description = description;
    this.importance = importance;
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
/*
function publicAddNote(noteTitle, description, importance, finishedTill, finished, callback)
{
    var note = new Note(noteTitle, description, importance, finishedTill, finished);
    db.insert(note, function(err, doc){
        if(callback){
            callback(err, doc);
        }
    });
}*/

function publicDelete(id, callback)
{
    db.remove({_id: id}, {}, function(err, doc){
        callback(err, doc);
    });
}

function publicEdit(id, noteTitle, description, importance, finishedTill, finished, callback){
    db.update({_id: id}, {$set: {"noteTitle": noteTitle, "description": description, "importance": importance, "finishedTill": finishedTill, "finished": finished}}, function(err, doc){
        callback(err, doc);
    });
}


function getData(callback) {
    db.find({}, callback);
}


module.exports = {add : addNote, getData : getData, edit : publicEdit, delete : publicDelete};
