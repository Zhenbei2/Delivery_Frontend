document.write("<script language=javascript src='/js/common.js'></script>");

function init() {
	url = get_url('/account/profile')
	$.ajax({
		url: url,
		headers: get_token(),
		type: "get",
		contentType: 'application/json',
		success: function(profile) {
			console.log(profile)
			$("#fullName").val(profile.fullName);
			$("#birthDate").val(profile.birthDate.split('T')[0]);
			$("#gender").val(profile.gender);
			$("#address").val(profile.address);
			$("#email").val(profile.email);
			$("#phoneNumber").val(profile.phoneNumber);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert('System error')
		}
	});
}

function updateProfile() {
	var data = get_form_json_data('profile')
	url = get_url('/account/profile')
	$.ajax({
		type: "put",
		url: url,
		contentType: 'application/json',
		headers: get_token(),
		data: JSON.stringify(data), 
		success: function(profile) {
			
			alert('Save Change Success!')
		},
		error: function(jqXHR, textStatus, errorThrown) {

		}
	});
	return false;
}