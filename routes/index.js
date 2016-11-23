var express = require('express');
var router = express.Router();
var notes = require('../controller/noteController.js');

router.get("/", notes.showIndex);
router.get("/notes/", notes.showNotePad);
router.get("/sort/:order/", notes.order);
router.get("/style/", notes.styler);
router.get("/invisible/", notes.invisible);

router.get("/edit/:id/", notes.editNote);
router.post("/edit/:id/", notes.saveEditedNote);

router.post("/notes/", notes.postData);
module.exports = router;