const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	try {
		const token = req.header('Authorization')
		if (!token) return res.status(400).json({ error: 'Invalid Authentication' })

		jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
			if (err) return res.status(400).json({ error: 'Token not valid.' })

			req.user = user
			next()
		})
	} catch (error) {
		return res.status(500).json(error)
	}
}

module.exports = auth
