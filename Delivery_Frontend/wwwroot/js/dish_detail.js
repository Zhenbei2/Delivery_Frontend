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
            // check if user has bought the dish
            var checkUrl = get_url('/dish/' + id + '/rating/check');
            $.ajax({
                type: "get",
                url: checkUrl,
                headers: get_token(),
                contentType: 'application/json',
                success: function (data) {
                    if (data == true) {
                        // enable rating feature
                        var rating_html = '<input type="number" id="rating-input" value="' + 0 + '" min="0" max="10">'
                            + '<button id="rating-submit" class="btn btn-primary">Submit Rating</button>';
                        $('#detail-rating').html(rating_html);

                        // bind event to submit rating
                        $('#rating-submit').on('click', function () {
                            var newRating = $('#rating-input').val();
                            var ratingUrl = get_url('/dish/' + id + '/rating') + "?rating=" + parseInt(newRating);
                            // var postData = { rating: parseInt(newRating) };

                            $.ajax({
                                type: "post",
                                url: ratingUrl,
                                headers: get_token(),
                                //data: JSON.stringify(postData),
                                contentType: 'application/json',
                                success: function () {
                                    alert('Rating submitted successfully!');
                                    window.location.reload();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    alert('Failed to submit rating. Please try again later.');
                                }
                            });
                        });

                    } else {
                        // disable rating feature
                        var rating_html = '<p>You need to purchase this dish before you can rate it.</p>';
                        $('#detail-rating').html(rating_html);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Failed to check user status. Please try again later.');
                }
            });
        }
    });
}

