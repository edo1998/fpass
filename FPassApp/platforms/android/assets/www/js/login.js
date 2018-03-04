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

function validateLogin() {
	var mail = document.getElementById('mail_login').value;
	var password = document.getElementById('password_login').value;
	$("#wrapper_login").css("visibility","visible");
	var oggetto ={ mail: mail, password: password};
	$.post(
		"https://www.rinonline.com/fpass/legge_anag.php",
		oggetto,
		function (data){
			$("#wrapper_login").css("visibility","hidden");
			var response = JSON.parse(data);
			if (response.errore1 == 0){
				localStorage.nome = response.nome;
				localStorage.cognome = response.cognome;
				localStorage.mail = mail;
				localStorage.passcode = response.passcode;
				if (response.errore2 == 0){
					localStorage.tessere = response.tessere;
				}else{
					localStorage.tessere = JSON.stringify([]);
				}
				localStorage.keep = 1;
				window.location = "home.html"
			}else{
				alert('E-mail o password scorretti');
			}
		}
	);
	return false;
}
