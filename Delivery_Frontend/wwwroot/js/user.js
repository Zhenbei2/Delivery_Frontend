document.write("<script language=javascript src='/js/common.js'></script>");
function login(){
	var data = get_form_json_data('login');

	$.ajax({
		url: get_url('/account/login'),
		contentType: 'application/json',
		type: "post",
		dataType: 'JSON',
		data: JSON.stringify(data), 
		success: function (obj) {
			console.log(obj);
			console.log(obj.token);
			console.log(obj.role);
			alert('Login Success!')
			var token = obj.token;
			var role = obj.role;
			set_token(token);
			set_role(role);
			
			window.location.href="/"
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('Email or Password error!')
		}
	});
	return false;
}

function register() {

	var data = get_form_json_data('register')
	url = get_url('/account/register')

	$.ajax({
		url: url,
		contentType: 'application/json',
		type: "post",
		dataType: 'JSON',
		data: JSON.stringify(data),
		success: function (obj) {
			alert('Register Success!')

		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			var responseText = jqXHR.responseText
			if (responseText) {
				json = JSON.parse(responseText)
				alert(json.title)
			}

		}
	});

	return false;
}