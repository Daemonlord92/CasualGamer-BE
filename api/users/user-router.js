const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./user-model');
const { jwtSecret } = require('../config/secrets');

router.get('/', async (req, res, next) => {
	try{
		const userData = await Users.find();
		res.status(200).json(userData);
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