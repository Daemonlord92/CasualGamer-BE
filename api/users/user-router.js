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

router.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const changes = req.body;

	if (!changes.password) {
		try {
			const changedUserInfo = await Users.editUser(id, changes);
			if (changedUserInfo) {
				res.status(204).json(changedUserInfo);
			} else {
				res.status(404).json({
					mes: 'invalid id'
				});
			} 
		}	catch (err) {
				next(err);
		};		
	} else {
		try {
			const hash = bcrypt.hashSync(changes.password);
			changes.password = hash;
			const changedUserInfo = await Users.editUser(id, changes);
			if (changedUserInfo) {
				res.status(204).json(changedUserInfo);
			} else {
				res.status(404).json({
					mes: 'invalid id'
				});
			} 
		}	catch (err) {
				next(err);
		};
	}
})


module.exports = router;