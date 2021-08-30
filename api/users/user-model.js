const db = require('../../data/dbConfig');

module.exports = {
	addUser,
	editUser,
	removeUser,
	find,
	findById,
	findBy
}

async function addUser(user) {
	return await db("users").insert(user);
}

async function editUser(id, changes) {
	return await db("users").where({ id }).update(changes, '*');
}

async function removeUser(id){
	return db("users").where("id", id).first();
}

async function find() {
	return db("users");
}

async function findBy(filter) {
	return await db("users").where(filter).first();
}

async function findById(id) {
	return await db("users").where({ id }).first();
}