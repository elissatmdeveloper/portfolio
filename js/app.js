$(document).ready(function() {

	// Muestra u oculta los elementos goUp y header(menu) segun el desplazamiento de ventana
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

	// Desplaza contenido al inicio de html
	goUp.click(function(e) {
			e.preventDefault();
			$('html, body').animate({scrollTop:0}, '1000');
	});

	
	// Banner de frases
	let frases = new Array(); 
	let autores = new Array();
	let motivs = new Array();
	let frase = $('#frase');
	let autor = $('#autor');
	let motiv = $('#motiv');
	let actual = 0;

	$.ajax({
			type: 'GET',
			url: 'json/frases.json',
			datatype: 'xml',
			success: processarResposta,
			error: processarError
	});

	function processarResposta(dades, statusText, jqXHR) {
		for (let i = 0; i < 3; i++) {
				frases.push(dades[i].phrase);
				autores.push(dades[i].author);
				motivs.push(dades[i].motiv);
		}
		frase.html(frases[actual]);
		autor.html(autores[actual]);
		motiv.html(motivs[actual]);
	}
		
	function processarError(jqXHR, statusText, error) {
			console.log(error, statusText);
	}

	$('#prevPhrase').click (function(e) {
		e.preventDefault();
		if(actual == 0) {
			actual = (frases.length)-1;
		} else {
			actual = actual - 1;
		}
		frase.html(frases[actual]);
		autor.html(autores[actual]);
		motiv.html(motivs[actual]);
	});

	$('#nextPhrase').click (function(e) {
		e.preventDefault();
		if(actual == (frases.length)-1) {
			actual = 0;
		} else {
			actual = actual + 1;
		}
		frase.html(frases[actual]);
		autor.html(autores[actual]);
		motiv.html(motivs[actual]);
	});
	
}); 
