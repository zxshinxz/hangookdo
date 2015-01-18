'user strict'

hangookdoApp.service('HangookdoService', function($q, $http, LocalService, AccessLevels) {
	
	var user;
	
	if(LocalService.get('hangookdo_auth_token') != null)
		user = angular.fromJson(LocalService.get('hangookdo_auth_token'));
	
	function setUser(obj){
		LocalService.set('hangookdo_auth_token', JSON.stringify(obj));
		user = obj;
	}
	
	var _getUser = function(){
		return  user;
	}
	
	var _isLoggedIn = function(){
		if(user){
			return true;
		}
		return false;
	}
	
	
	var _createFile = function(name, content) {
		var deferred = $q.defer();
		
		$http({
			url: 'file/create',
			method: 'POST',
			data: { 'fileName': name, 'content': content },
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			alert('could not able to upload file.')
			deferred.reject();
		});
		
		return deferred.promise;
		
	};
	
	var _getFiles = function(word) {
		
		var deferred = $q.defer();
		
		if(word){
			$http({url:'file/findall', params: {search: word}, method: 'GET'})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
				alert('could not able to upload file.')
				deferred.reject();
			});
		}else{
			$http({url:'file/findall', method: 'GET'})
			.success(function(data, status, headers, config){
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
				alert('could not able to  get files.')
				deferred.reject();
			});
		}
		
		return deferred.promise;
		
	};
	
	var _removefile= function(id){
		
		var deferred = $q.defer();
		
		$http({url:'file/remove', params: {fileid: id}, method: 'POST'})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			alert('could not able to  remove file.')
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	
	var _sendEmail = function(email){
		var deferred = $q.defer();
		
		$http({
			url: 'email/sendmail',
			method: 'POST',
			data: { 'firstname': email.firstName, 
				'lastname': email.lastName, 
				'emailaddress': email.eAddress, 
				'phone': email.phone, 
				'content': email.content },
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			alert('Could not send a email. Please try later.')
			deferred.reject();
		});
		
		return deferred.promise;
	}
	
	var _createUser = function(user){
		
		var deferred = $q.defer();
		
		$http({
			url: 'user/register',
			method: 'POST',
			data: { 'userid': user.userId, 
				'password': user.psd, 
				'firstname': user.firstName, 
				'lastname': user.lastName, 
				'email': user.email },
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data.message);
		})
		.error(function(data, status, headers, config){
			deferred.reject(data.error);
		});
		
		return deferred.promise;
		
	}
	
	var _checkId = function(userId){
		
		var deferred = $q.defer();
		
		$http({
			url: 'user/checkid',
			method: 'POST',
			data: { 'userid': userId},
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			alert(data.error);
			deferred.reject();
		});
		
		return deferred;
		
	}
	
	var _checkEmail = function(email){
		
		var deferred = $q.defer();
		
		$http({
			url: 'user/checkemail',
			method: 'POST',
			data: { 'email': email},
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			alert(data.error);
			deferred.reject();
		});
		
		return deferred;
		
	}
	
	var _login = function(user){
		

		var deferred = $q.defer();

		$http({
			url: 'user/login',
			method: 'POST',
			data: { 'id': user.id, 
				'password': user.password
				},
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			
			if(data.user.isUserActive){
				setUser(data);
			}
			
			deferred.resolve(data.user);
			
		})
		.error(function(data, status, headers, config){
			deferred.reject(data.error);
		});
		
		return deferred.promise;
	}
	
	var _logout = function(){
		LocalService.unset('hangookdo_auth_token');
		user = null;
	}
	
	var _reactivate = function(){
		

		var deferred = $q.defer();

		$http({
			url: 'user/sendmail',
			method: 'POST',
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data.message);
		})
		.error(function(data, status, headers, config){
			deferred.reject(data.error);
		});
		
		return deferred.promise;
	}
	
	
	var _resetPassword = function(user){
		
		var deferred = $q.defer();
		
		$http({
			url: 'user/passwordreset',
			method: 'POST',
			data: { 'userid': user.userId, 
				'email': user.email },
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data.message);
		})
		.error(function(data, status, headers, config){
			deferred.reject(data.error);
		});
		
		return deferred.promise;
	}
	
	
	var _newPassword =  function(user){
		
		var deferred = $q.defer();
		
			$http({
				url: 'user/reset',
				method: 'POST',
				data: { 'newpsd': user.psd },
				headers: {'Content-Type': 'application/json'}
			})
			.success(function(data, status, headers, config){
				deferred.resolve(data.message);
			})
			.error(function(data, status, headers, config){
				deferred.reject(data.error);
			});
		
		return deferred.promise;
	}
	
	var _authorize = function(access) {
	      if (access === AccessLevels.user) {
	          return this.isAuthenticated();
	        } else {
	          return true;
	        }
      }
	
	var _isAuthenticated = function(){
		return LocalService.get('hangookdo_auth_token');
	}
	

	return {
		createFile : _createFile,
		getFiles: _getFiles,
		removefile: _removefile,
		sendEmail: _sendEmail,
		createUser: _createUser,
		checkId: _checkId,
		checkEmail: _checkEmail,
		login: _login,
		logout: _logout,
		reactivate: _reactivate,
		resetPassword: _resetPassword,
		newPassword: _newPassword,
		isLoggedIn: _isLoggedIn,
		getUser: _getUser,
		authorize: _authorize,
		isAuthenticated: _isAuthenticated
	};
});
