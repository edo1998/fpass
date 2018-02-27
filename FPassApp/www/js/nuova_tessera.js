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
