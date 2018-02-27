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
		cordova.plugins.barcodeScanner.scan(
			function (result) {
			    if(!result.cancelled){
			      alert("Barcode type is: " + result.format);
			      alert("Decoded text is: " + result.text);
			    }else{
			      alert("You have cancelled scan");
			    }
		  	},
			function (error) {
			      alert("Scanning failed: " + error);
			}
		);
    }
    // Update DOM on a Received Event
};
