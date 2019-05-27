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
		// $("#registrazione").on('pagebeforeshow',function(event){
		// 	$("#registrazione").css("visibility","hidden");
		// });
		// $("#registrazione").on('pageshow',function(event){
		// 	setTimeout(function() {
		// 		$("#registrazione").css("visibility","visible");
		// 	}, 200);
		// });
    },
    // Update DOM on a Received Event
};

function isValidDate(d) {
  	return moment(d, 'DD/MM/YY',true).isValid()
}

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
	var data_nascita = document.getElementById('data_nascita').value;
	var comune = document.getElementById('comune').value;
	var check_mail = ValidateEmail(mail);
	if((check_mail && mail == conf_mail) && (password == conf_password && password != "") && nome != "" && cognome != "" && comune != "" && isValidDate(data_nascita)){
		$("#wrapper").css("visibility","visible");
		var oggetto ={ nome: nome, cognome: cognome,  mail: mail, password: password, comune: comune, data_nascita: data_nascita};
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
		$("#mail").parent().removeClass("error");
		$("#conf_mail").parent().removeClass("error");
		$("#password").parent().removeClass("error");
		$("#conf_password").parent().removeClass("error");
		$("#nome").parent().removeClass("error");
		$("#cognome").parent().removeClass("error");
		$("#comune").parent().removeClass("error");
		$("#data_nascita").parent().removeClass("error");
		if (!check_mail || mail != conf_mail){
			$("#mail").parent().addClass("error");
			$("#conf_mail").parent().addClass("error");
		}
		if (password != conf_password || password == ""){
			$("#password").parent().addClass("error");
			$("#conf_password").parent().addClass("error");
		}
		if (nome == ""){
			$("#nome").parent().addClass("error");
		}
		if (cognome == ""){
			$("#cognome").parent().addClass("error");
		}
		if (comune == ""){
			$("#comune").parent().addClass("error");
		}
		if (!isValidDate(data_nascita)){
			$("#data_nascita").parent().addClass("error");
		}
		return false;
	}
}
