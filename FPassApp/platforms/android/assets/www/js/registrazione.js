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
    },
    // Update DOM on a Received Event
};

function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true;
  }
    return false;
}


function validate() {
	var nome = document.getElementById('nome').value;
	var cognome = document.getElementById('cognome').value;
	var mail = document.getElementById('mail').value;
	var conf_mail = document.getElementById('conf_mail').value;
	var password = document.getElementById('password').value;
	var conf_password = document.getElementById('conf_password').value;
	var check_mail = ValidateEmail(mail);
	if((check_mail && mail == conf_mail) && (password == conf_password && password != "") && nome != "" && cognome != ""){
		$("#wrapper").css("visibility","visible");
		var oggetto ={ nome: nome, cognome: cognome,  mail: mail, password: password};
		$.post(
			"https://www.rinonline.com/fpass/nuovo_anag.php",
			oggetto,
			function (data){
				$("#wrapper").css("visibility","hidden");
				var response = JSON.parse(data);
				if (response.errore == 0){
					localStorage.nome = response.nome;
					localStorage.cognome = response.cognome;
					localStorage.mail = mail;
					localStorage.passcode = response.passcode;
					localStorage.keep = 1;
					localStorage.tessere = JSON.stringify([]);
					window.location = "home.html"
				}else{
					alert('Si è verificato un errore');
				}
			}
		);
		return false;
	}else{
		if (!check_mail || mail != conf_mail){
			document.getElementById("mail").className += "error";
			document.getElementById("conf_mail").className += "error";
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
