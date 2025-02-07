function goToFirstPage() {
	$("#first").css('display', "block");
	$("#second").css('display', "none");
	$("#idErrorPage").css('display', "none");
	$("#pwdErrorPage").css('display', "none");
}
function goToSecondPage() {
	$("#first").css('display', "none");
	$("#second").css('display', "block");
	$("#idErrorPage").css('display', "none");
	$("#pwdErrorPage").css('display', "none");
}

function goToCharIDError() {
	$("#first").css('display', "none");
	$("#second").css('display', "none");
	$("#idErrorPage").css('display', "block");
	$("#pwdErrorPage").css('display', "none");
}

function goToPwdErrorPage() {
	$("#first").css('display', "none");
	$("#second").css('display', "none");
	$("#idErrorPage").css('display', "none");
	$("#pwdErrorPage").css('display', "block");
}

function exampleButton() {
	var jailtime = $("#editjailtime").val();
	var jailreason = $("#editjailreason").val()
	var jailid = $("#enterid").val()

	clearAllFields();
	$.post("http://safr_jail/jailNuiCallback", JSON.stringify({
		 time: jailtime,
		 reason: jailreason,
		 id : jailid
	}));
	

}


function checkInfo() {
	//Here you should trigger an event and make sure the player id is valid but for now i'll just make sure it's a number
	var cpwd = "safrleo"
	var pwd = $("#enterpassword").val()
	var id = $("#enterid").val();
	if (id > 0 && Number.isInteger(Number(id))) {
		if(pwd === cpwd){
			console.log('Valid Password and ID')
			goToSecondPage()
		}else {
			console.log('invalid Password')
			goToPwdErrorPage()
		}
	}
	else {
		console.log('invalid');
		goToCharIDError();
	}
}

function closeUI() {
	$("#first").css('display', "none");
	$("#second").css('display', "none");
	$("#idErrorPage").css('display', "none");
	$("#pwdErrorPage").css('display', "none");	

	clearAllFields();
	$.post('http://safr_jail/closeUI', JSON.stringify({}));
}

function clearAllFields() {
	$("#enterid").val("");
	$('#enterpassword').val("");
	$("#editjailtime").val("");
	$("#editjailreason").val("");
	$("#editfirstname").val("");
	$("#editsecondname").val("");
}
$(function () {
	 window.addEventListener('message', function (event) {
		 if (event.data.type == "DISABLE_ALL_UI") {
			$("#first").css('display', "none"); // For each section you add to HTML you need to add it here as well
			$("#second").css('display', "none");
			$("#idErrorPage").css('display', "none");
			$("#pwdErrorPage").css('display', "none");	
		 }
		 else if (event.data.type == "DISPLAY_JAIL_UI") {
			goToFirstPage();
		 }
		 else if (event.data.type == "DISPLAY_JAIL_ID_ERROR") {
			goToCharIDError();
		 }
	 });


	 //This limits key controls on fields:
	 $('#enterid').bind("paste",function(e) { e.preventDefault(); });
	 enterid.onkeypress = function(e) {
		if(!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8 || e.keyCode == 9 || (e.keyCode >= 97 && e.keyCode <=122))) { //if key is not 0-9 or backspace
			return false;
		}
	}
});