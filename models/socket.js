var onlineUsers = {};
var onlineCustomers = {};

function socketInitialize(io){
	io.on('connection', function(socket){		
		console.log('A user connected');
			
		/* User connected */
		socket.on('User Connected', function(user){
			console.log('User connect: ' + user.id);
			onlineUsers[user.id] = socket;
		});
			
		socket.on('Send Message', function(msg){	
			//console.log('new message: ' + msg);
			io.emit('Push Message', msg);
		});
	});
}
	
module.exports = {
	initial: socketInitialize, 
	onlineUsers: onlineUsers, 
	onlineCustomers: onlineCustomers
};