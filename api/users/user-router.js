const router = require('express').Router();
const Users = require('./user-model');


router.get('/', async (req, res, next) => {
	try{
		const userData = await Users.find();
		res.status(200).json(userData);
	} catch (err) {
		next(err);
	}
})


module.exports = router;