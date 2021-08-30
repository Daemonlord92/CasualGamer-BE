const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./users/user-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', authRouter);

server.get('/', (req, res) => {
	res.status(200).json({
		mes:"Hello, the server is running"
	});
});

server.use((err, req, res, next) => {
	err.statusCode = err.statusCode ? err.statusCode : 500;
	res.status(err.statusCode).json({
		mes: err.message,
		stack: err.stack
	});
});

module.exports = server;