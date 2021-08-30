const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model');
const { jwtSecret } = require('../config/secrets');

router.post('/', async (req, res, next) => {
	const data = req.body;

	const hash = bcrypt.hashSync(data.password, 12);
	data.password = hash;

	try {
		const newUser = await Users.addUser(data);
		res.status(200).json({
			message: `Welcome ${newUser.username}!`
			// token
		})
	} catch (err) {
		next(err);
	}

})

router.post('/login', async (req, res, next) => {
	let {
		username,
		password
	} = req.body;

	try {
		const user = await Users.findBy({
			username
		});

		if (user &&bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				message: `Welcome ${user.username}!`,
				// token
			});
		} else {
			next(err);
		}

	} catch (err) {
		next(err);
	}
})

function createToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
  }

  const secret = jwtSecret;

  const options = {
      expiresIn: '2h'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;