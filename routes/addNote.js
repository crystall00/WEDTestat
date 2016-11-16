var express = require('express');
var note = require('../controller/noteController.js')
var router = express.Router();


/* GET adNote listing. */
//WICHTIG: get und post geben den relativen PFAD zum aktuellen PFAD an

router.get('/', note.renderSite);
router.post('/', note.postData);

/*
router.get("/", note.showIndex);
router.get("/notes", note.createNote);
router.post("/notes", note.saveNote);
router.get("/notes/:id/", note.editNote);
router.post("/notes/:id", note.saveEdit);
router.post("/notes/:id/update/", note.updateNote);
*/
/*router.get('/:input_title', function (req, res, next) {


 });*/

module.exports = router;
