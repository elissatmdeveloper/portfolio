//variable global
let numIntents = 0;
let numEncertar;

//Funció que genera un array amb quatre números diferents del 0 al 9
function creaArray(){

	// Initial empty array
	let arr = [];
	  
	do {
	    // Generem un número aleatori entre 0 i 9
	    const randomNumber = Math.floor(Math.random() * 10);
	  
	    // L'afegim a l'array si no està repetit
	    if (!arr.includes(randomNumber)) {
	        arr.push(randomNumber);
	    }
	  
	} while (arr.length < 4);
	  
	// Retornem l'array
	return arr;
}

//Ens assegurem que s'han carregat tots els elements del document
//abans de començar a treballar amb ells
 window.onload = function () {
 	
    //Creem el número a endevinar
    numAEncertar = creaArray();
     
    //Agafem l'element identificador inicial per moure a través del DOM
    let inici = document.getElementById('inici');

    //Agafem els elements de les cel·les on s'introduiran els nombres
     let primer = inici.children[0].children[0].children[0];
     let segon = inici.children[0].children[0].children[1];
     let tercer = inici.children[0].children[0].children[2];
     let quart = inici.children[0].children[0].children[3];

    //Els assignem l'esdeveniment per al doble clic
    primer.addEventListener('dblclick', seleccio);
    segon.addEventListener('dblclick', seleccio);
    tercer.addEventListener('dblclick', seleccio);
    quart.addEventListener('dblclick', seleccio);

    //Els assignem l'esdeveniment d'entrada i sortida del ratolí
    primer.addEventListener('mouseenter', entraRatoli);
    primer.addEventListener('mouseleave', surtRatoli);
    segon.addEventListener('mouseenter', entraRatoli);
    segon.addEventListener('mouseleave', surtRatoli);
    tercer.addEventListener('mouseenter', entraRatoli);
    tercer.addEventListener('mouseleave', surtRatoli);
    quart.addEventListener('mouseenter', entraRatoli);
    quart.addEventListener('mouseleave', surtRatoli);

	//Esborrem l'intent d'exemple
    let intentExemple = inici.children[0].children[3].children[0];
    intentExemple.parentElement.removeChild(intentExemple);
  
	//Assignem l'esdeveniment de polsació d'una tecla
	document.body.addEventListener('keydown', polsacioTecla);
	
	//Assignem l'esdeveniment al botó de reiniciar la partida
    let reiniciar = inici.children[0].children[2];
	reiniciar.addEventListener('click', reset);
	
	//Assignem l'esdeveniment al botó de comprovació del codi
    let comprovar = inici.children[0].children[1];
	comprovar.addEventListener('click', comprovacio);
     
    //Assignem l'esdeveniment a l'icona fletxa cap avall del codi
	document.body.addEventListener('click', moureAvall);
     
    //Assignem l'esdeveniment a l'icona amb el signe més
	document.body.addEventListener('click', mostrarBarra);
    
     
	//Funcio que salta quan fem doble clic sobre una cel·la
	function seleccio(e) {
		//Treiem la classe de l'element seleccionat actualment
		let seleccionat = document.getElementsByClassName("seleccionat")[0];
		seleccionat.classList.remove("seleccionat");

		//Agafem l'element sobre el que s'ha fet doble clic i li assignem la classe
		//A la Unitat 5 veurem que és millor utilitzar "this" que "e.target"
		//per obtenir l'element que ha fet saltar l'esdeveniment
		let elem = e.target;
		elem.classList.add("seleccionat");

	}

	//Funcio que salta quan entre el ratolí a una cel·la
	function entraRatoli(e){
		//Agafem l'element sobre el que s'ha passat el ratolí per sobre
		//i li assignem la classe "sobre"
		//A la Unitat 5 veurem que és millor usar "this" que "e.target"
		//per obtenir l'element que ha fet saltar l'esdeveniment
		let elem = e.target;
		elem.classList.add("sobre");
	}

	//Funcio que salta quan surt el ratolí d'una cel·la
	function surtRatoli(e){
		//Agafem l'element del que s'ha tret el ratolí de sobre
		//i li treiem la classe "sobre"
		let elem = e.target;
		elem.classList.remove("sobre");
	}
	
	//Funcio que salta quan premem una tecla
	function polsacioTecla(e){
		//Agafem el valor de la tecla polsada
		let tecla = parseInt(e.key);

		//Agafem la cel·la seleccionada
		let seleccio = document.getElementsByClassName("seleccionat")[0]; 
		
		//Si la tecla es correspon a un número del zero al nom
		//posem aquest número a la cel·la seleccionada
		if (tecla >= 0 && tecla <= 9) {
			seleccio.textContent = tecla;
		}		
	}

	//Funcio que salta quan fem clic sobre el botó de reiniciar
	function reset(){
		numAEncertar = creaArray();
        numIntents = 0;
		primer.textContent = "?";
		segon.textContent = "?";
		tercer.textContent = "?";
		quart.textContent = "?";
        
        //Eliminem les files d'intents
        let intent = inici.children[0].children[3];
        if (intent.hasChildNodes()){
            while (intent.childNodes.length >= 1) {
                intent.removeChild(intent.firstChild);
            }
        }
	}
     
	//Funcio que salta quan fem clic sobre el botó comprovar
	function comprovacio(){
		let numPosOK = 0;
		let numPosKO = 0;

		//Agafem les valors dels nombres introduïts a les cel·les
		let primerNum = parseInt(primer.textContent);
		let segonNum = parseInt(segon.textContent);
		let tercerNum = parseInt(tercer.textContent);
		let quartNum = parseInt(quart.textContent);
        
        //Juntem els valors dels nombres introduïts a les cel·les
        let numeroIntroduit = [primer.textContent,
                               segon.textContent,
                               tercer.textContent,
                               quart.textContent];

		//Comprovem si hi ha algun número a la posició correcta (numPosOK) o
		//almenys que hi sigui però en una posició incorrecta (numPosKO)
		if (numAEncertar[0] == primerNum) {
			numPosOK++;
		} else {
			if(numAEncertar.includes(primerNum)){
				numPosKO++;
			}
		}

		if (numAEncertar[1] == segonNum) {
			numPosOK++;
		} else {
			if(numAEncertar.includes(segonNum)){
				numPosKO++;
			}
		}

		if (numAEncertar[2] == tercerNum) {
			numPosOK++;
		} else {
			if(numAEncertar.includes(tercerNum)){
				numPosKO++;
			}
		}

		if (numAEncertar[3] == quartNum) {
			numPosOK++;
		} else {
			if(numAEncertar.includes(quartNum)){
				numPosKO++;
			}
		}

		//Si tots els numeros són correctes, el jugador ha guanyat
		if (numPosOK == 4) {
			alert("Has encertat el número secret!");
			reset();
            
        } else {
            numIntents +=1;

            if(numIntents < 5) { 
                //Afegim variable amb acces a l'element (div class='intents') partint de (body id='inici')
                let intents = inici.children[0].children[3];
                
                //Afegim els intents
                let addIntent = document.createElement('div');
                addIntent.setAttribute('class','intent');
                intents.appendChild(addIntent);
                
                //Afegim el número introduit a l'intent
                let addPrimer = document.createElement('span');
                addPrimer.textContent = primer.textContent;
                let addSegon = document.createElement('span');
                addSegon.textContent = segon.textContent;
                let addTercer = document.createElement('span');
                addTercer.textContent = tercer.textContent;
                let addQuart = document.createElement('span');
                addQuart.textContent = quart.textContent;
                
                intents.lastChild.appendChild(document.createElement('div'));
                intents.lastChild.lastChild.appendChild(addPrimer);
                intents.lastChild.lastChild.appendChild(addSegon);
                intents.lastChild.lastChild.appendChild(addTercer);
                intents.lastChild.lastChild.appendChild(addQuart);
                
                //Afegim les numPosOK i numPosKO
                intents.lastChild.appendChild(document.createElement('div'));
                for (let i=0; i<numPosOK; i++) {
                    intents.lastChild.lastChild.appendChild(document.createElement('i'));
                    let i = intents.lastChild.lastChild.lastChild;
                    i.setAttribute('class','fas fa-check-square');
                }
                for (let i=0; i<numPosKO; i++) {
                    intents.lastChild.lastChild.appendChild(document.createElement('i'));
                    let i = intents.lastChild.lastChild.lastChild;
                    i.setAttribute('class','fas fa-recycle');
                }
                
                //Afegim icones fletxa
                let fletxaUp = document.createElement('i');
                fletxaUp.setAttribute('class','fas fa-arrow-alt-circle-up');
                let fletxaDown = document.createElement('i');
                fletxaDown.setAttribute('class','fas fa-arrow-alt-circle-down');
                
                intents.lastChild.appendChild(document.createElement('div'));
                intents.lastChild.lastChild.appendChild(fletxaUp);
                intents.lastChild.lastChild.appendChild(fletxaDown);
              
                //Afegim icones finals
                let menys = document.createElement('i');
                menys.setAttribute('class','fas fa-minus-square');
                let paperera = document.createElement('i');
                paperera.setAttribute('class','fas fa-trash');
                
                intents.lastChild.appendChild(document.createElement('div'));
                intents.lastChild.lastChild.appendChild(menys);
                intents.lastChild.lastChild.appendChild(paperera);
              
            } else {
                //Si ja estan tots els intents plens, el jugador ha perdut
                alert("Has perdut! El número a endevinar era: " + numAEncertar.join(''));
                reset();
            }
        }
	}

    /** (Sense usar la biblioteca jQuery) Si es polsa la icona de la fletxa cap avall, la barra 
    * s’haurà de col·locar just a sota de la barra que tingui immediatament davall, a no ser que 
    * la barra sobre la qual polsem la fletxa sigui l’última; en aquest cas no s’haurà de fer res.
    */
    //Funció que salta al fer clic sobre l'icona fletxa cap avall
    function moureAvall(e){  
        if(e.target.getAttribute("class") == "fas fa-arrow-alt-circle-down") {
            let intent = e.target.parentElement.parentElement;
            intent.parentElement.insertBefore(intent.nextSibling, intent);
        }
    }

    /** (Sense usar la biblioteca jQuery) Quan l’usuari cliqui un element amb el signe més (  +  ) 
    * d’una barra que ha estat ocultada, s’haurà de mostrar de nou tot el seu contingut i l’element 
    * amb signe més (  +  ) s’haurà de canviar per l’element amb signe menys (  ─  ) original 
    * (<i class="fas fa-minus-square"></i>).
    */
    //Funció que salta al fer clic sobre l'icona amb el signe mes
    function mostrarBarra(e){
        let element;
        if(e.target.getAttribute("class") == "fas fa-plus-square") {
            let intentOcult = e.target.parentElement.parentElement.children;
            for(let i=0; i<intentOcult.length; i++){
                element = intentOcult[i].children;
                for (let j=0; j<element.length; j++){
                    element[j].style.display = "";
                }
            }
            e.target.setAttribute("class", "fas fa-minus-square");
        }
    }
}
 
 
 
//jQuery --> 
//Ens assegurem que s'han carregat tots els elements del document
//abans de començar a treballar amb ells
$(document).ready(function() {
    
    //Afegim variable amb acces a l'element (div class='intents') partint de (body id='inici')
    let $inici = $('#inici');

    let $numero = $inici.children().children('.numero');
    let $intents = $inici.children().children('.intents');

    //Assignem l'esdeveniment de polsació de la tecla ENTER
    $(document).on('keydown', comprovacio);
    
    //Assignem l'esdeveniment de polsació de l'icona paperera
    $intents.on('click', '.fas.fa-trash', eliminarBarra);
    
    //Assignem l'esdeveniment de polsació de l'icona fletxa cap amunt
    $intents.on('click', '.fas.fa-arrow-alt-circle-up', moureAmunt);
    
    //Assignem l'esdeveniment de polsació de l'icona amb el signe menys
    $intents.on('click', '.fas.fa-minus-square', ocultarBarra);
    
    
    //Funció que salta quan premem la tecla ENTER
    function comprovacio(e){
        e.preventDefault();
        //keyCode == 13 correspon a la tecla ENTER
        if(e.keyCode == 13){

            let numPosOK = 0;
            let numPosKO = 0;
            
            //Agafem les valors dels nombres introduïts a les cel·les
            let primerNum = $numero.children('#primer').text();
            let segonNum = $numero.children('#segon').text();
            let tercerNum = $numero.children('#tercer').text();
            let quartNum = $numero.children('#quart').text();
                        
            //crea un array amb el número introduït
            let numeroIntr = [primerNum,
                              segonNum, 
                              tercerNum, 
                              quartNum];

            //Comprovem si hi ha algun número a la posició correcta (numPosOK) o
            //almenys que hi sigui però en una posició incorrecta (numPosKO)
            for (let i=0; i<numAEncertar.length; i++){
                if(numAEncertar[i] == numeroIntr[i]) {
                    numPosOK++;
                } else if (numAEncertar[0] == numeroIntr[i]) {
                    numPosKO++;
                } else if (numAEncertar[1] == numeroIntr[i]) {
                    numPosKO++;
                } else if (numAEncertar[2] == numeroIntr[i]) {
                    numPosKO++;
                } else if (numAEncertar[3] == numeroIntr[i]) {
                    numPosKO++;
                } 
            }
                        
            //Si tots els numeros són correctes, el jugador ha guanyat
            if (numPosOK == 4) {
                alert("Has encertat el número secret!");
                reset();

            } else {
                numIntents +=1;

                if(numIntents < 5) { 
                    //Afegim els intents
                    let $divIntent = $('<div>');
                    $divIntent.addClass('intent');
                    $intents.append($divIntent);

                    //Afegim el número introduit a l'intent
                    $intents.children().append('<div>');
                    $intents.children().last('.intent').children().append('<span>'+primerNum+'</span>');
                    $intents.children().last('.intent').children().append('<span>'+segonNum+'</span>');
                    $intents.children().last('.intent').children().append('<span>'+tercerNum+'</span>');
                    $intents.children().last('.intent').children().append('<span>'+quartNum+'</span>');

                    //Afegim les numPosOK i numPosKO
                    $intents.children().append('<div>');
                    for (let i=0; i<numPosOK; i++) {
                        let $square = $('<i>');
                        $square.addClass('fas fa-check-square');
                        $intents.children().last('.intent').children().last().append($square);
                    }
                    for (let i=0; i<numPosKO; i++) {
                        let $recycle = $('<i>');
                        $recycle.addClass('fas fa-recycle');
                        $intents.children().last('.intent').children().last().append($recycle);
                    }

                    //Afegim icones fletxa
                    let $fletxaUp = $('<i>');
                    $fletxaUp.addClass('fas fa-arrow-alt-circle-up');
                    let $fletxaDown = $('<i>');
                    $fletxaDown.addClass('fas fa-arrow-alt-circle-down');

                    $intents.children().append('<div>');
                    $intents.children().last('.intent').children().last().append($fletxaUp);
                    $intents.children().last('.intent').children().last().append($fletxaDown);

                    //Afegim icones finals
                    let $menys = $('<i>');
                    $menys.addClass('fas fa-minus-square');
                    let $paperera = $('<i>');
                    $paperera.addClass('fas fa-trash');

                    $intents.children().append('<div>');
                    $intents.children().last('.intent').children().last().append($menys);
                    $intents.children().last('.intent').children().last().append($paperera);

                } else {
                    //Si ja estan tots els intents plens, el jugador ha perdut
                    alert("Has perdut! El número a endevinar era: " + numAEncertar.join(''));
                }
            }
        }
    }  
    
    /** (Usant la biblioteca jQuery) Quan l’usuari polsi la icona del cubell d’escombraries
      * d’alguna de les barres creades a la part inferior, aquesta barra s’haurà d’eliminar.
      */
    //Funció que salta quan fem click sobre l'icona paperera
    function eliminarBarra(){
        $(this).parent().parent().remove();
        numIntents--; 
    }

    /** (Usant la biblioteca jQuery) Quan l’usuari polsi la icona de la fletxa cap amunt d’una 
      * barra aquesta barra s’haurà de col·locar just damunt de la barra que té situada just a sobre, 
      * a no ser que la barra sobre la qual polsem la fletxa sigui la primera; en aquest cas, no 
      * haurà de passar res. 
      */
    //Funció que salta quan fem click sobre l'icona fletxa amunt
    function moureAmunt(){
        $(this).parent().parent().insertBefore($(this).parent().parent().prev());
    }
    
    /** (Usant la biblioteca jQuery) Feu que, quan un usuari polsi l’element amb el signe menys 
      * d’alguna de les barres de la part inferior, s’oculti tot el contingut d’aquesta 
      * barra, exceptuant l’element amb el signe menys que acabem de clicar. A banda, aquest element 
      * s’haurà de canviar per un element amb un signe més a dintre (<i class="fas fa-plus-square"></i>).
      */
    //Funció que salta quan fem click sobre l'icona amb el signe menys
    function ocultarBarra(){
        let $mes = $('<i>');
        $mes.addClass('fas fa-plus-square');
        $(this).parent().parent().children().children().hide();
        $(this).show();
        $(this).replaceWith($mes);
    }
});

