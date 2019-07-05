function saveAlternative(){

domtoimage.toJpeg(document.getElementById('alternativeStaticCloud'), { quality: 1, bgcolor: 'white', width: 1350})
	.then(function (dataUrl) {
		var link = document.createElement('a');
		link.download = 'my-image-name.jpeg';
		link.href = dataUrl;
		link.click();
	});
}

function saveStatic(){
domtoimage.toJpeg(document.getElementById('staticCloudDiv'), { quality: 1, bgcolor: 'white', width: 1350})
	.then(function (dataUrl) {
		var link = document.createElement('a');
		link.download = 'my-image-name.jpeg';
		link.href = dataUrl;
		link.click();
	});
}