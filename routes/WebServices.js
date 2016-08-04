var express = require('express');
var router = express.Router();
var socket = require('../models/socket');

/* All about web services */
router.get('/accountMessage', function(req, res) {
	/* Dispatcher */
	var randNum = Math.floor(Math.random() * Object.keys(socket.onlineUsers).length);
	var userDispatched = Object.keys(socket.onlineUsers)[randNum];
	
	socket.onlineCustomers[req.query.id] = socket.onlineUsers.Tommy;
	socket.onlineUsers[userDispatched].emit('Push Message', req.query.msg);
});

module.exports = router;