const encodingTypes = ["ean5", "ean2", "ean13", "ean8", "upca", "upce", "isbn", "ismn", "issn", "code128", "ean14", "sscc18", "code39", "code39ext", "code32", "pzn", "code93", "code93ext", "interleaved2of5", "itf14", "identcode", "leitcode", "databaromni", "databarstacked", "databarstackedomni", "databartruncated", "databarlimited", "databarexpanded", "databarexpandedstacked", "gs1northamericancoupon", "pharmacode", "pharmacode2", "code2of5", "industrial2of5", "iata2of5", "matrix2of5", "coop2of5", "datalogic2of5", "code11", "bc412", "rationalizedCodabar", "onecode", "postnet", "planet", "royalmail", "auspost", "kix", "japanpost", "msi", "plessey", "telepen", "telepennumeric", "posicode", "codablockf", "code16k", "code49", "flattermarken", "raw", "daft", "symbol", "pdf417", "pdf417compact", "micropdf417", "datamatrix", "datamatrixrectangular", "qrcode", "microqrcode", "maxicode", "azteccode", "azteccodecompact", "aztecrune", "codeone", "hanxin", "dotcode", "ultracode", "ean13composite", "ean8composite", "upcacomposite", "upcecomposite", "databaromnicomposite", "databarstackedcomposite", "databarstackedomnicomposite", "databartruncatedcomposite", "databarlimitedcomposite", "databarexpandedcomposite", "databarexpandedstackedcomposite", "gs1datamatrix", "gs1datamatrixrectangular", "gs1qrcode", "hibccode39", "hibccode128", "hibcdatamatrix", "hibcdatamatrixrectangular", "hibcpdf417", "hibcmicropdf417", "hibcqrcode", "hibccodablockf", "hibcazteccode", "channelcode", "renlinear", "renmatrix", "renmaximatrix"]
// console.log(encodingTypes);

document.querySelector('#generate-qr-code').onclick = e => {
	e.preventDefault();
	const qrText = document.querySelector('#qr-text').value;
	const qrType = document.querySelector('#barcode-type').value;
	document.querySelector('#qr-text-span').textContent = qrText;
	console.log('Posting JSON:', { text: qrText, type: qrType });
	$.ajax({ url: '/api/generate-qr-code', method: 'POST', data: { text: qrText, type: qrType } })
		.then(response => {
			console.log('Response:', response);
			document.querySelector('#qr-link').setAttribute('href', '/' + response.url);
			document.querySelector('#qr-image').setAttribute('src', '/' + response.url);
			document.querySelector('#qr-div').classList.remove('invisible');
		});
};