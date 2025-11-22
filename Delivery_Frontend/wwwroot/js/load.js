document.write("<script language=javascript src='/js/common.js'></script>");
function init_user(page) {
    url = get_url('/account/profile')
    $.ajax({
        url: url,
        headers: get_token(),
        type: "get",
        contentType: 'application/json',
        success: function(profile) {
            if (profile.id != null) {

                $('#nav_username').html(profile.fullName);
                $('#nav_username').attr('href', '/profile');
                $('#login_register_div').hide();
                $('#username_logout_div').show();
            } else {
                $('#nav_username').html('');
                $('#nav_username').removeAttr('href');
                $('#login_register_div').show();
                $('#username_logout_div').hide();
                $('#carts_len').hide();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
    
    url = get_url('/basket/')
    $.ajax({
       // url: "https://food-delivery.kreosoft.ru/api/basket/",
        url: get_url('/basket/'),
        type: "get",
        headers:get_token(),
        contentType: 'application/json',
        success: function (carts) {
            console.log('111carts');
            console.log(carts);
            // if user is log in, show the length of carts
            if (carts) {
                $('#carts_len').html(carts.length);
                $('#carts_len').show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function logout()
{
    url = get_url('/account/logout')
    $.ajax({
        type: "post",
        headers: get_token(),
        url: url,
        contentType: 'application/json',
        success: function (obj) {
            alert('Logout Success');
            set_token('')
			//debugger
			parent.location.href='/Home/login'
            window.location.href='/Home/login'
          
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
