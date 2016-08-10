var iCRM = angular.module('iCRM', ['ngAnimate', 'ui.bootstrap', 'starter.services']);

iCRM.controller('csCtrl', function($scope, $http, socket) {
	var inputMsg = $('#inputMsg');
	var userId;
	var nowAccount;
    $scope.tabItems = {};
	
	$http.get('http://127.0.0.1:8080/getUser')
        .then(function (res) {
			userId = res.data.userId;
			socket.emit('User Connected', {id: res.data.userId});
		}, function (err) {
			alert('Oops! Server has been shutdown.');
		}
	);
	
	$scope.onChangeTab = function(accountId){
		nowAccount = accountId;    // 切換客戶分頁，同時將 nowAccount 設為對應的客戶
	}
	
	$scope.sendMsg = function (msg){
		socket.emit('Send Message', {username: userId, accountname: nowAccount, message: msg});
		inputMsg.val('');
	};
	
	socket.on('New Customer', function(account){
		if(Object.keys($scope.tabItems) == 0){
			nowAccount = account.id;    // 如果是第一個客戶連近來，先將 nowAccount 指向第一個客戶
		}
		
		$scope.tabItems[account.id] = [];
	});
	
	socket.on('Push Message', function(account){
		//console.log(account);
		$scope.tabItems[account.id].push(account.message);
	});
});