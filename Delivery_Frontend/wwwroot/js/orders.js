document.write("<script language=javascript src='/js/common.js'></script>");
function init() {
	url = get_url('/order')
	$.ajax({

		url: url,
		type: "get",
		headers: get_token(),
		contentType: 'application/json',
		success: function (orders) {
			// debugger
			var html = '';
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i]
				html = html + '<div class="border-bottom  orders-item">';
				html = html + '	<div class="orders-item-info">';
				html = html + '		<div onclick="viewOrderDetail(\'' + order.id + '\')">Order from ' + order.orderTime.split('T')[0] + '</div>';
				html = html + '		<div>Order status - ' + order.status + '</div>';
				var deliveryTime = 'Delivery time:' + order.deliveryTime;
				if (order.status == 'InProcess') {
					deliveryTime = 'Except delivery time:' + order.deliveryTime;
				}
				html = html + '		<div>' + deliveryTime + '</div>';
				html = html + '	</div>';
				html = html + '	<div class="orders-item-info-button">';
				html = html + '		<div style="height: 48px;">';
				html = html + '			<button class="btn btn-outline-success " ';
				if (order.status == 'InProcess') {
					html = html + ' style="float: right;margin-top: 10px;margin-right: 10px;" onclick="confirm(\'' + order.id + '\')">Confirm Delivey</button>';

				} else {
					html = html + ' style="float: right;margin-top: 10px;margin-right: 10px;display:none;">Confirm Delivey</button>';
				}
				html = html + '		</div>';

				html = html + '		<div style="padding-right: 10px;margin-top: 10px;"><b>Total order cost:</b> ' + order.price + ' $</div>';
				html = html + '	</div>';

				html = html + '</div>';
			}
			$('#orders').html(html)

		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
}
function confirm(id) {
	url = get_url('/order/' + id + '/status')
	$.ajax({

		url: url,
		type: "post",
		headers: get_token(),
		contentType: 'application/json',
		success: function (orders) {
			alert('confirm success')
			init()

		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
}