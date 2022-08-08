$(document).ready(function() {
  
    let goUp = $('#goUp');
    let header = $('#header');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            goUp.removeClass('showGoUp');
        } else {
            goUp.addClass('showGoUp');
        }
        if ($(window).scrollTop() > 50) {
            header.addClass('showBG');
        } else {
            header.removeClass('showBG');
        }
    });

    goUp.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '1000');
    });

}); 