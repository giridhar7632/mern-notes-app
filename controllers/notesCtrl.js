const Notes = require('../models/notes.model.js')

const getNotes = async (req, res) => {
	try {
		const notes = await Notes.find({ user_id: req.user.id })
		res.json(notes)
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

const createNotes = async (req, res) => {
	try {
		// 1. Create a note
		const { title, content, date } = req.body
		const newNote = new Notes({
			title,
			content,
			date,
			user_id: req.user.id,
			name: req.user.name,
		})

		// 2. Save note to database
		await newNote.save()
		res.status(200).json({ msg: 'Notes created. ✌', type: 'success' })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

const getNote = async (req, res) => {
	try {
		const note = await Notes.findById(req.params.id)
		res.json(note)
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

const deleteNote = async (req, res) => {
	try {
		await Notes.findByIdAndDelete(req.params.id)
		res.json({ msg: 'Note Deleted', type: 'success' })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

const updateNote = async (req, res) => {
	try {
		const { title, content, date } = req.body
		await Notes.findOneAndUpdate(
			{ _id: req.params.id },
			{
				title,
				content,
				date,
			}
		)

		res.json({ msg: 'Notes updated 🎉', type: 'info' })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

module.exports = { getNotes, getNote, createNotes, updateNote, deleteNote }
