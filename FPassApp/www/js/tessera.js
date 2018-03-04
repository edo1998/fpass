function generateBarcode(){
	var tipo = localStorage.tipo;
	var codice = localStorage.codice;
	if (tipo == "CODABAR" || tipo == "CODE_39" || tipo == "CODE_93" || tipo == "CODE_128" || tipo == "EAN_8" || tipo == "EAN_13" || tipo == "MSI" || tipo == "DATA_MATRIX"){
		tipo = tipo.toLowerCase().replace("_","");
		$("#code").barcode(codice,tipo);
	}else if(tipo == "ITF"){
		JsBarcode("#code2", codice, {
			format: tipo
		});
	}else if(tipo == "UPC_A" || tipo == "UPC_E"){
		JsBarcode("#code2", codice, {format: "UPC"});
	}else if (tipo == "QR_CODE"){
		$("#code").qrcode(codice);
	}
}
