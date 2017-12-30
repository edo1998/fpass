var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.getElementById("body").style.visibility = "visible";
    },
    // Update DOM on a Received Event
};

function checkCF(cf){
	return true;
}

function validate() {
	var nome = document.getElementById('nome').value;
	var cf = document.getElementById('cf').value;
	var password = document.getElementById('password').value;
	var conf_password = document.getElementById('conf_password').value;
	var check_cf = checkCF(cf);
	if(check_cf && (password == conf_password && password != "") && nome != ""){
		//DO COSE
	}else{
		if (!check_cf){
			document.getElementById("cf").className += "error";
		}
		if (password != conf_password || password == ""){
			document.getElementById("password").className += "error";
			document.getElementById("conf_password").className += "error";
		}
		if (nome == ""){
			document.getElementById("nome").className += "error";
		}
		return false;
	}
}
