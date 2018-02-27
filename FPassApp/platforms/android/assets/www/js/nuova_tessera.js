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
		$("#passcode").val(localStorage.passcode);
		$("#aggiungi").click(
			function(){
				var id_locale = document.getElementById('id_locale').value;
				var codice = document.getElementById('codice').value;
				var tipo = document.getElementById('tipo').value;
				var passcode = document.getElementById('passcode').value;
				if(id_locale != "" && codice != "" && passcode != "" && tipo != ""){
					$("#wrapper").css("visibility","visible");
					var oggetto ={id_locale: id_locale, codice: codice,  tipo: tipo, passcode: passcode};
					$.post(
						"https://www.rinonline.com/fpass/nuova_tessera.php",
						oggetto,
						function (data){
							$("#wrapper").css("visibility","hidden");
							var response = JSON.parse(data);
							if (response.errore == 0){
								var tessere = JSON.parse(localStorage.tessere);
								tessere.push(oggetto)
								localStorage.tessere = JSON.stringify(tessere);
								window.location = "home.html"
							}else{
								alert('Si è verificato un errore');
							}
						}
					);
				}else{
				}
			}
		);
		$("#indietro").click(
			function(){
				window.location = "home.html";
			}
		);
		$("#scan").click(
			function(){
				cordova.plugins.barcodeScanner.scan(
					function (result) {
					    if(!result.cancelled){
							$("#tipo").val(result.format);
							$("#codice").val(result.text);
					    }else{
					    	alert("Hai annullato la scansione");
					    }
				  	},
					function (error) {
						alert("Scansione fallita: " + error);
					}
				);
			}
		);
    },
    // Update DOM on a Received Event
};

function validate() {
	var id_locale = document.getElementById('id_locale').value;
	var codice = document.getElementById('codice').value;
	var tipo = document.getElementById('tipo').value;
	var passcode = document.getElementById('passcode').value;
	if(id_locale != "" && codice != "" && passcode != "" && tipo != ""){
		$("#wrapper").css("visibility","visible");
		var oggetto ={id_locale: id_locale, codice: codice,  tipo: tipo, passcode: passcode};
		$.post(
			"https://www.rinonline.com/fpass/nuova_tessera.php",
			oggetto,
			function (data){
				$("#wrapper").css("visibility","hidden");
				var response = JSON.parse(data);
				if (response.errore == 0){
					var tessere = JSON.parse(localStorage.tessere);
					tessere.push(oggetto)
					localStorage.tessere = JSON.stringify(tessere);
					window.location = "home.html"
				}else{
					alert('Si è verificato un errore');
				}
			}
		);
		return false;
	}else{
		return false;
	}
}
