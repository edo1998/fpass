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

function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    return (false)
}


function validate() {
	var nome = document.getElementById('nome').value;
	var cognome = document.getElementById('cognome').value;
	var cf = document.getElementById('cf').value;
	var password = document.getElementById('password').value;
	var conf_password = document.getElementById('conf_password').value;
	var check_mail = ValidateEmail(cf);
	if(check_mail && (password == conf_password && password != "") && nome != "" && cognome != ""){
		//DO COSE
	}else{
		if (!check_mail){
			document.getElementById("mail").className += "error";
		}
		if (password != conf_password || password == ""){
			document.getElementById("password").className += "error";
			document.getElementById("conf_password").className += "error";
		}
		if (nome == ""){
			document.getElementById("nome").className += "error";
		}
		if (cognome == ""){
			document.getElementById("cognome").className += "error";
		}
		return false;
	}
}
