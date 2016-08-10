var express = require('express');
var router = express.Router();
var socket = require('../models/socket');

/* All about web services */
router.get('/accountMessage', function(req, res){
	/* Dispatcher */
	if(!socket.onlineCustomers[req.query.id]){
		var randNum = Math.floor(Math.random() * Object.keys(socket.onlineUsers).length);    // Get random number
		var nameDispatched = Object.keys(socket.onlineUsers)[randNum];
	
		socket.onlineCustomers[req.query.id] = socket.onlineUsers[nameDispatched];
		socket.onlineCustomers[req.query.id].emit('New Customer', {id: req.query.id});
	}
	
	socket.onlineCustomers[req.query.id].emit('Push Message', {id: req.query.id, message: req.query.msg});
	
	res.status(204);
});

module.exports = router;