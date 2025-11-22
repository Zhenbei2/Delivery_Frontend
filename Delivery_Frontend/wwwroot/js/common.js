
function get_form_json_data(form_id){
	//debugger
	var fields = $("#"+form_id).serializeArray();
	var obj = {};
	$.each(fields, function (index, field) {
		if (field.value == 'true') {
			field.value = true;
		}

		if (field.value == 'false') {
			field.value = false;
		}
		obj[field.name] = field.value; 
	})
	
	return obj;

}
function set_token(token)
{
localStorage.setItem("token",token);	
	
}
function get_token()
{
	token = localStorage.getItem('token')
	return {
		"Authorization": "Bearer "+ token +""
	}
}

function set_role(role) {
	localStorage.setItem("role", role);

}
function get_role() {
	return localStorage.getItem('role');

}
function get_url(url)
{
	//var base_url = 'https://food-delivery.kreosoft.ru/api'
	var base_url = 'http://localhost:5097/api'
	console.log(base_url + url);
	
	return base_url+url
}

function get_url_param() {
    let url = document.location.toString();
    let arrObj = url.split("?");
    let params = Object.create(null) 
    if (arrObj.length > 1) {
        arrObj = arrObj[1].split("&");
        arrObj.forEach(item => {
            item = item.split("=");
            params[item[0]] = item[1]
        })
    }
    return params;
}

