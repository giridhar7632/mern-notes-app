const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
	response.send('Hello, World! 👋')
})

app.listen(port, () => {
	console.log(`Server running on port ${port} 🚀`)
})
