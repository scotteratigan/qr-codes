document.querySelector('#generate-qr-code').onclick = e => {
	e.preventDefault();
	const qrText = document.querySelector('#qr-text').value;
	document.querySelector('#qr-text-span').textContent = qrText;
	console.log(qrText);
	$.ajax({ url: '/api/generate-qr-code', method: 'POST', data: { text: qrText } })
		.then(response => {
			console.log('Response:', response);
			document.querySelector('#qr-link').setAttribute('href', '/' + response.url);
			document.querySelector('#qr-image').setAttribute('src', '/' + response.url);
			document.querySelector('#qr-div').classList.remove('invisible');
		});
};