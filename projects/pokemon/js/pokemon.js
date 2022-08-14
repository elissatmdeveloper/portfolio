$(document).ready(function(){
	let contenidorPokemons = $('.contenidor-pokemon');
	function carregarPokemons() {
	  let imatgesPokemons = '';
	  // 1118 Pokemons disponibles
	  for (let i = 1; i <= 600; i++) {
	    imatgesPokemons += `
	      <img class='pokemon-img' data-id='${i}' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg'>
	    `;
	  }
	  contenidorPokemons.html(imatgesPokemons);
	}
	carregarPokemons();
    
    
    //EXERCICI 2-1
    let $pokemons = $('.contenidor-pokemon');
    $pokemons.on('click', '.pokemon-img', escollirPokemon);
   
    function escollirPokemon() {
        let idPokemon = $(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + idPokemon + '/',
            datatype: 'xml',
            success: processarResposta,
            error: processarError
        });

        
        //EXERCICI 2-2
        function processarResposta(dades, statusText, jqXHR) {
            let moviments = new Array(); 
            for (let i = 0; i < 3; i++) {
                moviments.push(dades.moves[i].move.name);
            }
            
            $('#moviments').text(moviments.join(', ') + ', ...'); 
            $('.pokemon-nom').text(dades.forms[0].name);
            $('#tipus').text(dades.types[0].type.name);           
            $('.caracteristiques').children().get(0).children[0].textContent = dades.base_experience; 
            $('.caracteristiques').children().get(1).children[0].textContent = dades.height; 
            $('.caracteristiques').children().get(2).children[0].textContent = dades.weight; 
            $('.caracteristiques').children().get(3).children[0].textContent = dades.stats[0].base_stat; 
            $('.caracteristiques').children().get(4).children[0].textContent = dades.stats[1].base_stat; 
            $('.caracteristiques').children().get(5).children[0].textContent = dades.stats[2].base_stat; 
            
            /*codi en el cas que les carcacterístiques tinguessin un id propi al codi HTML
            $('#exp_base').text(dades.base_experience); 
            $('#height').text(dades.height); 
            $('#weight').text(dades.weight); 
            $('#hp').text(dades.stats[0].base_stat); 
            $('#attack').text(dades.stats[1].base_stat); 
            $('#defense').text(dades.stats[2].base_stat); 
            */
            
            let urlFront = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + idPokemon + '.png';
            let urlBack = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + idPokemon + '.png';
            $('.pokemon-imatges').children().first().attr('src',urlFront);
            $('.pokemon-imatges').children().last().attr('src',urlBack);
        }

        function processarError(jqXHR, statusText, error) {
            console.log(error, statusText);
        }
    }    
});