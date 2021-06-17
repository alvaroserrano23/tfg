function actualizarInputFile() {
	var filename = "'" + this.value.replace(/^.*[\\\/]/, '') + "'";
	this.parentElement.style.setProperty('--fn', filename);
	console.log(filename);
	}
	
	document.querySelectorAll(".file-select input").forEach((ele)=>ele.addEventListener('change', actualizarInputFile));