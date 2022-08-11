$(document).ready(function() {

	/*muestra u oculta los elementos goUp y header(menu) segun el desplazamiento de ventana*/
	let goUp = $('#goUp');
	let header = $('.header');
	let item = $('.nav-link');
	let logo = $('.img-logo');
	let btnNavbar = $(".navbar-toggler");

	$(window).scroll(function() {
		if ($(window).scrollTop() > 200) {
			goUp.removeClass('showGoUp');
		} else {
			goUp.addClass('showGoUp');
		}
		if ($(window).scrollTop() > 50) {
			header.addClass('showBG');
			item.css("color", "rgb(60, 60, 60)");
			logo.css("filter", "invert(0)");
			btnNavbar.css("filter", "invert(0)");
		} else {
			header.removeClass('showBG');
			item.css("color","white");
			logo.css("filter", "invert(1)");
			btnNavbar.css("filter", "invert(1)");
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
