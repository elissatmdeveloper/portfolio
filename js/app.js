$(document).ready(function() {
  
    var goUp = $('#goUp');

    $(window).scroll(function() {
        if ($(window).scrollTop() < 200) {
            goUp.addClass('showgoup');
        } else {
            goUp.removeClass('showgoup');
        }
    });

    goUp.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '1000');
    });

}); 