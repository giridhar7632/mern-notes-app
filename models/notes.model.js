import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			default: 'Untitled',
		},
		content: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: new Date(),
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Notes = mongoose.model('Notes', notesSchema)

module.exports = Notes
