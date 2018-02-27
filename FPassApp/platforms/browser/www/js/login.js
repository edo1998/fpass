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

function validate() {
	var mail = document.getElementById('mail').value;
	var password = document.getElementById('password').value;
	$("#wrapper").css("visibility","visible");
	var oggetto ={ mail: mail, password: password};
	$.post(
		"https://www.rinonline.com/fpass/legge_anag.php",
		oggetto,
		function (data){
			$("#wrapper").css("visibility","hidden");
			console.log(data);
			//window.location = "home.html"
		}
	);
	return false;
}
