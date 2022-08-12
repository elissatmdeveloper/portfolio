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

	
	// Banner de frases
	let frase = $('#frase');
	let autor = $('#autor');

	$.ajax({
			type: 'GET',
			url: 'json/frases.json',
			datatype: 'xml',
			success: processarResposta,
			error: processarError
	});

	function processarResposta(dades, statusText, jqXHR) {
		let frases = new Array(); 
		let autores = new Array();
		for (let i = 0; i < 3; i++) {
				frases.push(dades[i].phrase);
				autores.push(dades[i].author);
		}
		frase.html(frases[2]);
		autor.html(autores[2]);
	}
		
	function processarError(jqXHR, statusText, error) {
			console.log(error, statusText);
	}
	
}); 
