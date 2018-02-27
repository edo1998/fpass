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
    		$("#tessere").append('<div class="list_element"><div class="icon"><i class="fas fa-credit-card fa-2x"></i></div><!----><div class="locale"><a href="tessera.html?codice='+tessere[i].codice+'">'+tessere[i].id_locale+'</a></div></div>');
		}
		$("#aggiungi").click(
			function(){
				window.location = "nuova_tessera.html";
			}
		);
    },
    // Update DOM on a Received Event
};
