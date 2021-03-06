var service = require("../services/note.js");
var store = require("../services/note.js");
var title = 'Alle Notizen';
var reverse = false;
var invisible = false;
var styleChanged = false;


module.exports.showIndex = function(req, res){
    service.getData(function(err, notes) {
        if(notes){
            switch (req.session.order) {
                case 'importance':
                    notes.sort(function (a, b) {
                        return (sorting(b.importance, a.importance))
                    });
                    if(!reverse){
                        req.session.sorting = 'importanceUp';
                    }else{
                        req.session.sorting = 'importanceDown';
                    }
                    break;
                case 'finishedTill':
                    notes.sort(function (a, b) {
                        return (sorting(b.finishedTill, a.finishedTill))
                    });
                    if(!reverse){
                        req.session.sorting = 'finishedUp';
                    }else{
                        req.session.sorting = 'finishedDown';
                    }
                    break;
                case 'created':
                    notes.sort(function (a, b) {
                        return (sorting(a.created, b.created))
                    });
                    if(!reverse){
                        req.session.sorting = 'createdUp';
                    }else{
                        req.session.sorting = 'createdDown';
                    }
                    break;
            }
            switch(invisible){
                case true:
                    if(notes.filter(function(a){return a.finished != 'on'})[0]){
                        title = 'Alle Notizen'
                    }else{
                        title = 'Keine Notizen'
                    }
                    if(styleChanged){
                        res.render('index', {title: title, notes : notes.filter(function(a){return a.finished != 'on'}), style : true, sorting: req.session.sorting, invisible: invisible});
                    }else{
                        res.render('index', {title: title, notes : notes.filter(function(a){return a.finished != 'on'}), sorting: req.session.sorting, invisible: invisible});
                    }
                    break;
                case false:
                    if(notes[0]){
                        title = 'Alle Notizen'
                    }else{
                        title = 'Keine Notizen'
                    }
                    if(styleChanged){
                        res.render('index', {title: title, notes : notes, style : true, sorting: req.session.sorting, invisible: invisible});
                    }else{
                        res.render('index', {title: title, notes : notes, sorting: req.session.sorting, invisible: invisible});
                    }
                    break;
            }
        }});
};

module.exports.newNote = function(req, res){
    if(styleChanged){
        res.render('createNote', {style : true});
    }else{
        res.render('createNote');
    }
};

module.exports.editNote = function(req, res){
    service.getData(function(err, notes)
    {
        if (styleChanged) {
            res.render('edit', {notes : notes.filter(function (a) {return a._id == req.params.id}), style: true});
        } else {
            res.render('edit', {notes : notes.filter(function (a) {return a._id == req.params.id})});
        }
    });
};

module.exports.saveNote = function(req, res){
    var title = (req.body.noteTitle);
    var desc = (req.body.noteDescription);
    var imp = (req.body.noteImportance);
    var finishedTill = (req.body.noteDate);
    var finished = (req.body.erledigt);
    store.edit(req.params.id,title, desc, imp, finishedTill,finished, function (err, newDoc) {
        if(err){
            res.status(err.status || 500);
            res.render('error');
            return;
        }
    });
    res.redirect('/');
};

module.exports.postData = function (req, res) {
    var title = (req.body.noteTitle);
    var desc = (req.body.noteDescription);
    var imp = (req.body.noteImportance);
    var finishedTill = (req.body.noteDate);
    var finished = (req.body.erledigt);
    store.add(title, desc, imp, finishedTill,finished, function (err, newDoc) {
        if(err){
            res.status(err.status || 500);
            res.render('error');
            return;
        }
        res.redirect('/');
    });
};

module.exports.deleteNote = function(req, res){
    service.delete(req.params.id, function (err, doc) {
        res.redirect('/');
    });
};
module.exports.order = function(req, res){
    if(req.session.order == req.params.order){
        reverse = !reverse;
    }else{
        reverse = false;
        req.session.order = req.params.order;
    }

    res.redirect('/');
};

module.exports.invisible = function(req, res){
    invisible = !invisible;
    res.redirect('/');
};

module.exports.styler = function(req, res){
    styleChanged = !styleChanged;
    res.redirect('/');
};


function sorting(a, b){
    if(reverse){
        if(a>b){
            return -1;
        }else if(a<b){
            return 1;
        }else{
            return 0;
        }
    }else{
        if(a>b){
            return 1;
        }else if(a<b){
            return -1;
        }else{
            return 0;
        }
    }
}


