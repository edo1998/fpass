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
		var tessere = JSON.parse(localStorage.tessere);
		for (i = 0; i < tessere.length; i++) {
    		$("#tessere").append('<li><a href="#tessera" class="tessera" data-transition="slide" codice="'+tessere[i].codice+'" tipo="'+tessere[i].tipo+'">'+tessere[i].descrizione+'</a></li>');
		}
		if (tessere.length == 0){
			$("#tessere").append('<li>Non hai ancora inserito una tessera</li>');
		}
		$(".tessera").click(
			function (event){
				localStorage.codice = $(event.target).attr("codice");
				localStorage.tipo = $(event.target).attr("tipo");
				localStorage.descrizione = $(event.target).html();
				generateBarcode();
			}
		);
		$("#tessere").listview("refresh");
		$("#passcode").val(localStorage.passcode);
		$("#logout").click(
			function() {
				localStorage.keep = 0;
				window.location = "index.html";
			}
		);
		$("#elimina").click(
			function (){
				$("#wrapper_tessera").css("visibility","visible");
				$.post(
					"https://www.rinonline.com/fpass/elimina_tessera.php",
					{passcode: localStorage.passcode, id_locale: localStorage.id_locale},
					function (data){
						var tessere = JSON.parse(localStorage.tessere);
						tessere.splice(tessere.indexOf({id_locale = localStorage.id_locale, codice: localStorage.codice, descrizione: localStorage.descrizione, tipo: localStorage.tipo}),1);
						localStorage.tessere = JSON.stringify(tessere);
						$("#wrapper_tessera").css("visibility","hidden");
						alert(data);
						//window.location = "home.html";
					}
				);
			}
		);
		$("#aggiungi").click(
			function() {
				if ($("#id_locale").length == 0){
					$("#wrapper").css("visibility","visible");
					$.post(
						"https://www.rinonline.com/fpass/elenco_locali.php",
						function (data){
							$("#wrapper").css("visibility","hidden");
							$("#form_tessera").prepend(data);
							$("#id_locale").selectmenu();
						}
					);
				}
			}
		);
		$("#aggiungi_form").click(
			function(){
				var id_locale = document.getElementById('id_locale').value;
				var locale = $("#id_locale option[value='"+id_locale+"']").text();
				var codice = document.getElementById('codice').value;
				var tipo = document.getElementById('tipo').value;
				var passcode = document.getElementById('passcode').value;
				if(id_locale != "" && codice != "" && passcode != "" && tipo != ""){
					$("#wrapper").css("visibility","visible");
					var oggetto ={id_locale: id_locale,locale: locale, codice: codice,  tipo: tipo, passcode: passcode};
					$.post(
						"https://www.rinonline.com/fpass/nuova_tessera.php",
						oggetto,
						function (data){
							var response = JSON.parse(data);
							if (response.errore == 0){
								var tessere = JSON.parse(localStorage.tessere);
								var oggetto ={id_locale: id_locale, descrizione: locale, codice: codice,  tipo: tipo};
								tessere.push(oggetto)
								localStorage.tessere = JSON.stringify(tessere);
								$("#wrapper").css("visibility","hidden");
								window.location = "home.html";
							}else{
								alert('Si è verificato un errore');
							}
						}
					);
				}else{
				}
			}
		);
		$("#scan").click(
			function(){
				cordova.plugins.barcodeScanner.scan(
					function (result) {
					    if(!result.cancelled){
							$("#tipo").val(result.format);
							$("#codice").val(result.text);
							$("#codice_scan").html("Tessera scannerizzata correttamente: "+result.text);
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
