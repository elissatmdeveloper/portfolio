$(document).ready(function() {

	// Muestra u oculta los elementos goUp y header(menu) segun el desplazamiento de ventana
	let goUp = $('#goUp');
	let header = $('.header');

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


	// Efecto texto máquina de escribir (javaScript)
	let text = ["Full Stack Developer","w3lcom3 to my sit3 !!!"];
	let position = 0; 
	let speed = 100;
	let count = 0;
	let typeText = document.querySelector("#inicio");
	
	write();
	function write () {
		if (count != text.length) {
			if(position++ != text[0+count].length) {
				typeText.children[1+count].innerHTML = text[0+count].substring(0, position) + '<span class="blink">|</span>';
				setTimeout(write, speed);
			} else {
				typeText.children[1+count].children[0].remove();
				position = 0;
				count++;
				write();
			}
		}
	}


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
	

	// Muestra u oculta imagen about
	let imgPrincipal = $('#imgPrincipal');
	let imgFondo = $('#imgFondo');
	imgPrincipal.click (function(e) {
		e.preventDefault();
		imgPrincipal.addClass('ocultar-img');
	})
	imgFondo.click (function(e) {
		e.preventDefault();
		imgPrincipal.removeClass('ocultar-img');
	})


	// Muestra u oculta PopUp about
	let icons = $('.icons');
	icons.click (function() {
		let popup = $(this).children('.popup');
			if(popup.hasClass('ocultar-popup')) {
				icons.children('.img').removeClass('ampliar-img-popup');
				icons.children('.img').css('z-index','1');
				icons.children('.popup').removeClass('mostrar-popup');
				icons.children('.popup').addClass('ocultar-popup');
				$(this).children('.img').addClass('ampliar-img-popup');
				$(this).children('.img').css('z-index','20');
				$(this).children('.popup').addClass('mostrar-popup');
				$(this).children('.popup').removeClass('ocultar-popup');
			} else {
				$(this).children('.img').removeClass('ampliar-img-popup');
				$(this).children('.img').css('z-index','1');
				$(this).children('.popup').removeClass('mostrar-popup');
				$(this).children('.popup').addClass('ocultar-popup');
			}
	})

}); 
