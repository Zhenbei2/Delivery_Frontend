document.write("<script language=javascript src='/js/common.js'></script>");
function init()
{
	url = get_url('/basket/')
	$.ajax({
	    
	    url: url,
		type: "get",
	    headers:get_token(),
	    contentType: 'application/json',
		success: function (carts) {
			console.log('carts');
			console.log(carts);
			var cart_html = ''
			for(var i=0;i<carts.length;i++)
			{
				var cart = carts[i]
				cart_html = cart_html +'<div class="border-bottom cart_food">';
				cart_html = cart_html +'	<div>'+(i+1)+'.</div>';
				cart_html = cart_html +'	<img class="rounded cart-image" src="'+cart.image+'">';
			
				cart_html = cart_html +'	<div class="cart_item_div">';
				cart_html = cart_html +'		<h5>Cheesecake New York</h5>';
				cart_html = cart_html +'		<div>Price:'+cart.price+' $/dish</div></div>';
					
				cart_html = cart_html +'	<div class="cart_item_add d-flex">';
			//	cart_html = cart_html +'		<button type="button" class="btn btn-light" onclick="reduceNum(\''+cart.id+'\','+cart.amount+')">-</button>';
				cart_html = cart_html + '		<button type="button" class="btn btn-light" onclick="reduceNum(\'' + cart.dishesId +'\','+cart.amount+')">-</button>';
				cart_html = cart_html +'		<span class="input-group-text" id="basic-addon2">'+cart.amount+'</span>';
				//cart_html = cart_html +'		<button type="button" class="btn btn-light" onclick="addNum(\''+cart.id+'\')">+</button>';
				cart_html = cart_html + '		<button type="button" class="btn btn-light" onclick="addNum(\'' + cart.dishesId +'\')">+</button>';
				cart_html = cart_html +'	</div>';
			//	cart_html = cart_html +'	<div class="remove"> <button class="btn btn-danger" onclick="remove(\''+cart.id+'\','+cart.amount+')">Remove</button></div>';
				cart_html = cart_html + '	<div class="remove"> <button class="btn btn-danger" onclick="remove(\'' + cart.dishesId +'\','+cart.amount+')">Remove</button></div>';
				
				cart_html = cart_html +'</div>';
				//console.log(cart_html)
			}
	        $('#carts').html(cart_html)
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	
	    }
	});
}
