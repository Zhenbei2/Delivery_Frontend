document.write("<script language=javascript src='/js/common.js'></script>");
// var id = "a8055168-fd45-48d4-43ce-08db52e4ac1e"
function init()
{
	var url = window.location.href;
	var index = url.lastIndexOf("\/");
	id = url.substring(index + 1,url.length);

		url = get_url('/order/'+id)
		$('#id').val(id)
	$.ajax({
		
		url: url,
		headers:get_token(),
		type: "get",
		contentType: 'application/json',
		success: function (order) {
			$('#status').text(order.status)
			if(order.status != 'InProcess'){
				$('#confrim_div').hide()
			}
			$('#orderTime').text(order.orderTime)
			$('#deliveryTime').text(order.deliveryTime)
			$('#address').text(order.address)
			var dishes =order.dishes;
			var html = ''
			var total = 0
			for(var i=0;i<dishes.length;i++)
			{
				var dish = dishes[i]
				html = html + '<div class="border-bottom cart_food">';
				
				html = html + '	<img class="rounded cart-image"';
				html = html +'		src="'+dish.image+'">';
				html = html +'	<div class="cart_item_div">';
				html = html +'		<div style="margin-top: 10px;font-weight: bold;">'+dish.name+'</div>';
				html = html +'		<div style="margin-top: 10px;">Price:'+dish.price+' $/dish</div>';
				html = html +'		<div >Quantity:'+dish.amount+'</div>';
				html = html +'	</div>';
				
				html = html +'	<div class="remove" style="margin-top: 65px;">';
				html = html +'		<div>Price:'+dish.totalPrice+'$</div>';
			html = html +'</div>';
				
			html = html +'	</div>';
			total = total + dish.totalPrice
			}
			
			$('#dishes').html(html)
			$('#total').html(total)
		},
		error: function (jqXHR, textStatus, errorThrown) {
	
		}
	});
}

function confirm()
{
	url = get_url('/order/'+$('#id').val()+'/status')
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