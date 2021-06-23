const router = require('express').Router()
const auth = require('../middleware/auth.js')
const notesCtrl = require('../controllers/notesCtrl.js')

router
	.route('/')
	.get(auth, notesCtrl.getNotes)
	.post(auth, notesCtrl.createNotes)

router
	.route('/:id')
	.get(auth, notesCtrl.getNote)
	.put(auth, notesCtrl.updateNote)
	.delete(auth, notesCtrl.deleteNote)

module.exports = router
