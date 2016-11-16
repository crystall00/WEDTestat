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
module.exports = {add : addNote, getData : getData};