function dropdown(id,boolean) {
	if(boolean){
		document.getElementById(id).style.display = "flex";
	}else{
		document.getElementById(id).style.display = "none";
	}
}

function closeAlert(id) {
	document.getElementById(id).style.display = "none";
}
