// alert('Linked');

document.querySelector('#generate-qr-code').onclick = event => {
	event.preventDefault();
	const qrText = document.querySelector('#qr-text').value;
	document.querySelector("#qr-text-span").textContent = qrText;
	console.log(qrText);
	$.ajax({ url: "/api/generate-qr-code", method: "POST", data: { text: qrText } })
		.then(response => {
			// var blob = new Blob([response], { type: 'image/png' });
			// alert('We got a response!');
			console.log('Response:', response);
			document.querySelector('#qr-link').setAttribute('href', '/' + response.url);
			document.querySelector('#qr-image').setAttribute('src', '/' + response.url);
			document.querySelector('#qr-div').classList.remove('invisible');
		});

};