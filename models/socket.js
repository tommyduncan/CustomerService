var onlineUsers = {};
var onlineCustomers = {};

function socketInitialize(io, request){
	io.on('connection', function(socket){		
		console.log('A user connected');
			
		/* User connected */
		socket.on('User Connected', function(user){
			console.log('User connect: ' + user.id);
			onlineUsers[user.id] = socket;
		});
			
		socket.on('Send Message', function(account){	
			//console.log('new message: ' + msg);
			request.post({
				url: 'http://140.124.183.133:3000/ilabBot/response',
				form: {
					username: account.username, 
					providerId: account.accountname, 
					messages: account.message
				}
			}, function(error, response, body){
				console.log(body);
			});
			
			io.emit('Push Message', {id: account.accountname, message: account.message});
		});
	});
}

module.exports = {
	initial: socketInitialize, 
	onlineUsers: onlineUsers, 
	onlineCustomers: onlineCustomers
};