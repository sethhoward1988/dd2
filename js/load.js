window.onload = function () {
	app = new App();
	var CLIENT_ID = '170341866546-1k4mk1vjm1le0ufmug24m5vdt7nab42p.apps.googleusercontent.com';
	var SCOPES = [
	  'https://www.googleapis.com/auth/drive'
	];
	handleClientLoad();

	/**
	* Called when the client library is loaded.
	*/
	function handleClientLoad() {
		checkAuth(false);
	}

	/**
	* Check if the current user has authorized the application.
	*/
	function checkAuth(usePopup) {
	gapi.auth.authorize(
	    {'client_id': CLIENT_ID, 'scope': SCOPES.join(' '), 'immediate': !usePopup},
	    handleAuthResult);
	}

	/**
	* Called when authorization server replies.
	*
	* @param {Object} authResult Authorization result.
	*/
	function handleAuthResult(authResult) {
		if(authResult){
			if(authResult.error != "immediate_failed"){
				// Access token has been successfully retrieved, requests can be sent to the API
		        gapi.client.load('drive', 'v2', function () {
		         	app.start();
		        });
			} else {
				var button = document.createElement('button');
				button.textContent = 'Authorize';
				button.addEventListener('click', function () {
					checkAuth(true);
				});
				document.body.appendChild(button);
			}
		} else {
			// No access token could be retrieved, force the authorization flow.
	    gapi.auth.authorize(
	        {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
	        handleAuthResult);
		}
	}	
};
