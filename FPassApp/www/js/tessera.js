function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

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
		var url = window.location.href;
		var parameters = parseURLParams(url);
		var tipo = parameters.tipo[0];
		var codice = parameters.codice[0];
		if (tipo == "CODABAR" || tipo == "CODE_39" || tipo == "CODE_93" || tipo == "CODE_128" || tipo == "EAN_8" || tipo == "EAN_13" || tipo == "MSI" || tipo == "DATA_MATRIX"){
			tipo = tipo.toLowerCase().replace("_","");
			$("#code").barcode(codice,tipo);
		}else if(tipo == "ITF"){
			JsBarcode("#code", codice, {
  				format: tipo
			});
		}else if(tipo == "UPC_A" || tipo == "UPC_E"){
			JsBarcode("#code2", codice, {format: "UPC"});
		}else if (tipo == "QR_CODE"){
			$("#code").qrcode(codice);
		}
		$("#indietro").click(
			function(){
				window.location = "home.html";
			}
		);
    },
    // Update DOM on a Received Event
};
