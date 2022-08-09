$(document).ready(function() {
  
    let goUp = $('#goUp');
    let header = $('.header');

    /*muestra u oculta los elementos goUp y header(menu) segun el desplazamiento de ventana*/
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

    /*desplaza contenido al inicio de html*/
    goUp.click(
        function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop:0}, '1000');
        }
    );

}); 
