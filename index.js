require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

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

app.get('/', (request, response) => {
	response.send('Hello, World! 👋')
})

app.listen(port, () => {
	console.log(`Server running on port ${port} 🚀`)
})
