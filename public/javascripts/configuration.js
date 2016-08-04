var iCRM = angular.module('iCRM', ['ngAnimate', 'ui.bootstrap', 'starter.services']);

iCRM.controller('csCtrl', function($scope, $http, socket) {
	var inputMsg = $('#inputMsg');
	$scope.messages = [];
    $scope.tabItems = [
		{
			heading: 'Tommy',
			content: 'Hello Tommy!'
		}, 
		{ 	
			heading: 'Jimmy',
			content: 'Hello Jimmy!'
		}, 
		{	
			heading: 'Lynn',
			content: 'Hello Lynn!'
		}, 
		{
			heading: 'Helen',
			content: 'Hello Helen!'
		}, 
		{
			heading: '小智',
			content: 'Hello 小智!'
		}
	];
	$http.get('http://127.0.0.1:8080/getUser')
        .then(function (res) {
			socket.emit('User Connected', {id: res.data.userId});
		}, function (err) {
			alert('Oops! Server has been shutdown.');
		}
	);
	
	$scope.sendMsg = function (msg){
		socket.emit('Send Message', msg);
		inputMsg.val('');
	};
	
	socket.on('Push Message', function(data){
		$scope.messages.push(data);	
	});
});