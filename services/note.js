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
    //wenn db insert einen Fehler wirft, wird das im err aufgefangen... im newDoc ist das Resultat wenn KEIN Fehlerfall, also das note das neu hinzugefügt wurde
    db.insert(note, function (err, newDoc) {
        if(callback){
            callback(err, newDoc);
        }
    });
}

function getData(callback) {
    //Bei db.find wird als erster Param. die Filterfunktion und dann der callback angegeben
    db.find({}, callback);
}

//WICHTIG: alle funktionen exportieren damit andere Functionen die sehen
module.exports = {add : addNote, getData : getData, getAll : publicAll, set : publicEdit, delete : publicDelete};


function publicDelete(id, callback)
{
    db.remove({_id: id}, {}, function(err, doc){
        callback(err, doc);
    });
}

function publicEdit(id, title, description, importance, finishedTill, finished, callback){
    db.update({_id: id}, {$set: {"title": title, "description": description, "importance": importance, "finishedTill": finishedTill, "finished": finished}}, function(err, doc){
        callback(err, doc);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, note) {
        callback(err, note);
    });
}