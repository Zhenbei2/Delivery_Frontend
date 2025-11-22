document.write("<script language=javascript src='/js/common.js'></script>");

function init_detail(){
    var url = window.location.href;
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1,url.length);
    url = get_url('/dish/'+id)

    $.ajax({
        type: "get",
        url: url,
        headers: get_token(),
        contentType: 'application/json',
        success: function (obj) {
            $('#dish_image').attr('src',obj.image)
            $('#category').text('Dish category- '+obj.category)
            $('#description').text(obj.description)
            $('#name').text(obj.name)
            $('#price').text('Price:'+obj.price+' $/dish')

            if(obj.vegetarian) {
                $('#vegetarian').text('vegetarian')
            } else {
                $('#vegetarian').text('Not vegetarian')
            }

            rating = obj.rating

            $('#detail-star').empty()    
            var dish_html= ''
            for (var j = 0; j < 10; j++) {
					if (j < rating) {
						dish_html += '<i class="bi bi-star-fill star-icon text-warning"></i>';
					} else if (j === Math.ceil(rating) && j!=rating) {
						dish_html += '<i class="bi bi-star-half star-icon text-warning"></i>';
					} else {
						dish_html += '<i class="bi bi-star star-icon text-warning"></i>';
					}
				}
            $('#detail-star').html(dish_html)    

        }
    });
}

