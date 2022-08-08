$(document).ready(function() {
  
    var goUp = $('#goUp');

    $(window).scroll(function() {
        if ($(window).scrollTop() < 200) {
            goUp.addClass('showGoUp');
        } else {
            goUp.removeClass('showGoUp');
        }
    });

    goUp.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '1000');
    });

}); 