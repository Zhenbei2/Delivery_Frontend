document.write("<script language=javascript src='/js/common.js'></script>");

function init() {
	init_profile()
	init_dish()
}

function init_dish() {
	url = get_url('/basket')
	$.ajax({
		type: "get",
		url: url,
		headers: get_token(),
		contentType: 'application/json',
		success: function (dishes) {
			var html = ''
			total = 0
			for (var i = 0; i < dishes.length; i++) {
				var dish = dishes[i]
				total = total + dish.totalPrice
				html = html + '<div class="border-bottom cart_food">';

				html = html + '	<img class="rounded cart-image"';
				html = html + '		src="' + dish.image + '">';
				html = html + '   	<div class="cart_item_div">';
				html = html + ' 		<div style="margin-top: 10px;font-weight: bold;">' + dish.name + '</div>';
				html = html + '  		<div style="margin-top: 10px;">Price:' + dish.price + ' $/dish</div>';
				html = html + '  		<div style="margin-top: 4px;">Quantity:' + dish.amount + '</div>';
				html = html + '  	</div>';

				html = html + '  	<div class="remove">';
				html = html + '	<div>Price:' + dish.totalPrice + '$</div>';
				html = html + '  	</div>';
				html = html + '</div>';
			}
			$('#total').html(total)
			$('#dishes').html(html)
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
}

function init_profile() {
	url = get_url('/account/profile')
	$.ajax({
		url: url,
		headers: get_token(),
		type: "get",
		contentType: 'application/json',
		success: function (profile) {
			console.log(profile)
			$("#email").val(profile.email);
			$("#phoneNumber").val(profile.phoneNumber);
			$('#address').val(profile.address)
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('System error')
		}
	});

}

function confirm_order() {

	$("#createOrder").click()
}

function create_order() {
	url = get_url('/order')
	var data = {
		"deliveryTime": $('#deliveryTime').val(),
		"address": $('#address').val()
	}
	//debugger
	$.ajax({
		url: url,
		contentType: 'application/json',
		type: "post",
		dataType: 'JSON',
		headers: get_token(),
		data: JSON.stringify(data),
		complete: function (obj) {
			alert('Create order Success!')
			window.location.href = "/Home/orders"

		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
	return false;

}