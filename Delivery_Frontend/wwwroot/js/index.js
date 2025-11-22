document.write("<script language=javascript src='/js/common.js'></script>");

function init_main() {
	var condtion = ''
	var url_param = get_url_param()
	if ('page' in url_param) {
		condtion = get_condtion(url_param['page'])
	} else {
		condtion = get_condtion(1)
	}
	url = get_url('/dish') + condtion

	$.ajax({

		url: url,
		type: "get",
		contentType: 'application/json',
		headers: get_token(),
		success: function (obj) {
			let myobj = JSON.parse(obj);
			pagination = myobj.pagination;
			init_main_table()
			draw_dishes(myobj.dishes)
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('system error')
		}
	});

}

function page_change(pageIndex, isCart) {
	if (parseInt(pageIndex) == parseInt(pagination.current) && isCart != true) {
		return
	}
	if (pageIndex == '-1' && pagination.current == 1) {
		return
	}
	if (pageIndex == '-2' && pagination.current == pagination.count) {
		return
	}
	var page = pagination.current
	var page_flag = pagination.current
	if (pageIndex == -1) {
		page = page - 1;

	} else if (pageIndex == -2) {
		page = page + 1;

	} else {
		page = pageIndex
	}
	condtion = get_condtion(page)

	url = get_url('/dish') + condtion
	$.ajax({

		url: url,
		type: "get",
		contentType: 'application/json',
		headers: get_token(),
		success: function (obj) {
			pagination = obj.pagination
			page_calss_change()
			draw_dishes(obj.dishes)

		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('system error')
		}
	});
}

function page_calss_change() {
	var pages = $('.page-item')
	pages.each(function (i, page_item) {
		$(page_item).removeClass('active')
		if ($(page_item).attr('page') == pagination.current) {
			$(page_item).addClass('active')
		}
	});
	$('#previous').removeClass('disabled');
	$('#last').removeClass('disabled');
	if (pagination.current == 1) {
		$('#previous').addClass('disabled');
	}
	if (pagination.current == pagination.count) {
		$('#last').addClass('disabled');
	}

}

function init_main_table() {
	var page_html = ''
	page_html = page_html +
		'<li class="page-item disabled" id="previous" onclick="page_change(-1)"><a class="page-link" href="#" tabindex="-1">Previous</a></li>'
	for (var i = 1; i <= pagination.count; i++) {

		if (pagination.current == i) {
			page_html = page_html + '<li class="page-item active" page="' + i + '" onclick="page_change(' + i +
				')"><a class="page-link" href="#">' + i + '</a></li>'
		} else {
			page_html = page_html + '<li class="page-item" page="' + i + '" onclick="page_change(' + i +
				')"><a class="page-link" href="#">' + i + '</a></li>'
		}

	}
	page_html = page_html +
		'<li class="page-item" id="last" onclick="page_change(-2)"><a class="page-link" href="#">Next</a></li>'
	$('#pagination').html(page_html)

}

function get_condtion(page) {
	var condtion = '?page=' + page
	var categories = $('#category').val()

	for (var i = 0; i < categories.length; i++) {
		condtion = condtion + '&'
		condtion = condtion + 'categories=' + categories[i]
	}
	var sort = $('#sort').val()
	if (sort) {
		condtion = condtion + '&sorting=' + sort
	}
	var vegetarian = $('#mySwitch').is(":checked")
	condtion = condtion + '&vegetarian=' + vegetarian
	return condtion
}

function draw_dishes(dishes) {
	console.log(dishes);
	url = get_url('/basket')
	$.ajax({
		type: "get",
		url: url,
		headers: get_token(),
		success: function (carts) {
			var ids = []
			for (var i = 0; i < carts.length; i++) {
				ids.push(carts[i].id)
			}
			var amounts = []
			for (var i = 0; i < carts.length; i++) {
				amounts.push(carts[i].amount)
			}
			$('#dishes').empty()
			for (var i = 0; i < dishes.length; i++) {
				dish = dishes[i]
				var dish_html = '<div class="card main-card"  onclick="viewDishDetail(\'' + dish.id + '\')">' +
					'<img class="main-image"' + '	src="' + dish.image + '"' + '	alt="Card image cap">' +
					'<h5 class="dish-name">' + dish.name + '</h5>' +
					'<div class="dish-category">Dish category-' + dish.category + '</div>';
				dish_html = dish_html + '<div class="border d-flex justify-content-center">';
				rating = dish.rating

				for (var j = 0; j < 10; j++) {
					if (j < rating) {
						dish_html += '<i class="bi bi-star-fill star-icon text-warning"></i>';
					} else if (j === Math.ceil(rating) && j != rating) {
						dish_html += '<i class="bi bi-star-half star-icon text-warning"></i>';
					} else {
						dish_html += '<i class="bi bi-star star-icon text-warning"></i>';
					}
				}

				dish_html = dish_html + '</div>';
				dish_html = dish_html + '<div class="description">' + dish.description + '</div>';
				dish_html = dish_html + '<div class="dish-bottom bg-light"><label>Price - ' + dish.price + '$</label>';
				var index = ids.indexOf(dish.id)
				if (index >= 0) {
					dish_html = dish_html + ' <div class="cart_item_add d-flex add-button" > ';
					dish_html = dish_html + '	<button type="button"  style="border:none" onclick="reduceNum(\'' + dish.id + '\',' + amounts.num + ')" class="btn btn-light">-</button>';
					dish_html = dish_html + '	<span class="input-group-text" style="border:none" id="basic-addon2">' + amounts[index] + '</span>';
					dish_html = dish_html + '	<button type="button" style="border:none" class="btn btn-light" onclick="addNum(\'' + dish.id + '\',' + amounts.num + ')">+</button>';
					dish_html = dish_html + ' </div>';
				} else {
					dish_html = dish_html + '<input type="button" class="btn btn-primary btn-sm" onclick="add_shopping_cart(\'' + dish.id + '\')" value="Add to cart"></div></div>';

				}

				$('#dishes').append(dish_html)

			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('System error')
		}
	});
}
function viewDishDetail(id) {
	window.location.href = '/Home/item/' + id
}
function reduceNum(id, num) {
	var even = window.event || arguments.callee.caller.arguments[0];
	even.preventDefault();
	even.stopPropagation();
	var increase = true
	if (num == 1) {
		increase = false
	}
	url = get_url('/basket/dish/' + id + '?increase=' + increase)
	$.ajax({

		url: url,
		type: "delete",
		headers: get_token(),
		contentType: 'application/json',
		success: function (obj) {
			page_change(pagination.current, true)
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('System error')
		}
	});
}

function addNum(id, num) {
	var even = window.event || arguments.callee.caller.arguments[0];
	even.preventDefault();
	even.stopPropagation();

	url = get_url('/basket/dish/' + id)
	$.ajax({

		url: url,
		type: "post",
		headers: get_token(),
		contentType: 'application/json',
		success: function (obj) {
			page_change(pagination.current, true)
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('System error')
		}
	});
}
function add_shopping_cart(id) {
	var even = window.event || arguments.callee.caller.arguments[0];
	even.preventDefault();
	even.stopPropagation();
	url = get_url('/basket/dish/' + id)
	$.ajax({
		url: url,
		headers: get_token(),
		type: "post",
		contentType: 'application/json',
		success: function (obj) {
			alert('Successfully added shopping cart. Please go to the shopping cart to view')
			page_change(pagination.current, true)
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('System error')
		}
	});

}