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

// Start a scan. Scanning will continue until something is detected or
// `QRScanner.cancelScan()` is called.
function scan(){

	var QRScanner = window.cordova.require('QRScanner');

	function displayContents(err, text){
	  if(err){
	    // an error occurred, or the scan was canceled (error code `6`)
	  } else {
	    // The scan completed, display the contents of the QR code:
	    alert(text);
	  }
	}

	QRScanner.scan(displayContents);

	// Make the webview transparent so the video preview is visible behind it.
	QRScanner.show();
	// Be sure to make any opaque HTML elements transparent here to avoid
	// covering the video.
}
