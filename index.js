require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Routes
const userRouter = require('./routes/userRouter.js')
const notesRouter = require('./routes/notesRouter.js')

const app = express()
const port = process.env.PORT || 5000

// middleware functions
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// connecting to mongodb atlas
const uri = process.env.MONGO_URI
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB connection is established successfully 🎉'))
	.catch((err) => console.log(err))

app.use('/users', userRouter)
app.use('/api/notes', notesRouter)

app.get('/', (request, response) => {
	response.send('Hello, World! 👋')
})

app.listen(port, () => {
	console.log(`Server running on port ${port} 🚀`)
})
