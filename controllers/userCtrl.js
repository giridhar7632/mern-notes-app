const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/user.model.js')

const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body
		const user = await Users.findOne({ email: email })

		// 1. Check if user already exists
		if (user)
			return res
				.status(500)
				.json({ msg: 'Email already exists.', type: 'error' })

		// 2. Encrypt password
		const passwordHash = await hash(password, 10)

		// 3. Create a user in database
		const newUser = new Users({
			username: username,
			email: email,
			password: passwordHash,
		})
		await newUser.save()
		res.json({ msg: 'Registered Successfully 🥳', type: 'success' })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		// 1. check if user exists
		const user = await Users.findOne({ email: email })

		// 2. If user dosen't exists
		if (!user)
			return res
				.status(500)
				.json({ msg: 'User does not exist. 😕', type: 'warning' })

		// 3. Check for password match
		const isMatch = await compare(password, user.password)
		if (!isMatch)
			return res
				.status(500)
				.json({ msg: 'Incorrect password. ⚠', type: 'error' })

		// 4. if login success, create a token
		const payload = { id: user._id, name: user.username }
		const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
			expiresIn: '1d',
		})

		res.json({ token, msg: 'Sign in Successful ✌', type: 'success' })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

const verifyUser = (req, res) => {
	try {
		const token = req.header('Authorization')

		// 1. if there is no token
		if (!token) return res.send(false)

		// 2. Verify the token
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
			if (err) return res.send(false)

			// 3. if the user exists in our database
			const user = Users.findById(verified.id)
			if (!user) return res.send(false)

			return res.send(true)
		})
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

module.exports = { registerUser, loginUser, verifyUser }
