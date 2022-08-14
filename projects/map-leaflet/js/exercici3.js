$(document).ready(function(){
    //Inicialitzar mapa
    let map = L.map('map'). setView([41.65678, 1.47245], 7);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);
    
    let selectProvincia = document.getElementById('provincia');
    selectProvincia.addEventListener('change', mostrarMunicipis);
    
    function mostrarMunicipis() {            
        let provincia = selectProvincia.options[selectProvincia.selectedIndex];

        $.ajax({
            type: 'GET',
            url: 'https://analisi.transparenciacatalunya.cat/resource/tb2m-m33b.json',
            dataType: 'json',
            success: omplirMunicipis,
        });

        function omplirMunicipis(dades, statusText, jqXHR) {
            let municipis = new Array();

            for(let i = 0; i < dades.length; i++) {
                let prov = dades[i].provincia;
                
                if(prov == provincia.text){
                    let muni = dades[i].municipi;
                    if(municipis.includes(muni)) {
                        console.log("Aquest element ja existeix a la matriu");
                    } else {
                        municipis.push(muni);
                    }
                }
            }
            removeOptions(document.getElementById("municipi"));
            omplirOption(municipis,"municipi");
        }
    }
    
    
    let selectMunicipi = document.getElementById('municipi');
    let markers = [];
    
    function omplirMapa() {
        let municipi = selectMunicipi.options[selectMunicipi.selectedIndex];

        $.ajax({
            type: 'GET',
            url: 'https://analisi.transparenciacatalunya.cat/resource/tb2m-m33b.json',
            dataType: 'json',
            success: processarResposta
        });
        
        function processarResposta(dades){
            netejarMapa();
            
            let puntLong;
            let puntLat;
            let contador = 0;
            
            for (let i = 0; i < dades.length; i++) {
                if(municipi.text == dades[i].municipi) {
                    
                    let longitud = dades[i].longitud;
                    let latitud = dades[i].latitud;
                    markers.push(L.marker([latitud, longitud]).addTo(map)
                        .bindPopup("<strong>" + dades[i].promotor_gestor + "</strong>"
                                   + "<br/>" + dades[i].adre_a
                                   + "<br/> Tipus de Vehicle: " + dades[i].tipus_vehicle
                                   + "<br/> Tipus de connexió: " + dades[i].tipus_connexi));
                    puntLong = longitud;
                    puntLat = latitud;
                    contador++;
                }    
            }
            
            $('#info').text("Número d'estacions localitzades: " + contador);
            map.setView([puntLat, puntLong], 12)
        }
    }
    

    let botoCercar = document.getElementById("search");
    botoCercar.addEventListener('click', omplirMapa);
    
    /*Funció per recorrer la matriu i omplir desplegable*/
    function omplirOption(matriu,idSelect) {
        for (let i = 0; i < matriu.length; i++) {
            //ordena alfabeticament la matriu
            matriu.sort(function (a, b) {
                return a.localeCompare(b);
            }); 
            let option = document.createElement('option');
            option.textContent = matriu[i];
            document.getElementById(idSelect).appendChild(option);
        }
    }
    
    /*Funció per esborrar desplegable*/
    function removeOptions(idSelect) {
        for(let i = idSelect.options.length - 1; i > 0; i--) {
              idSelect.remove(i);
        }  
    }
    
    /*Funció per netejar Mapa de marcadors*/
    function netejarMapa() {
        for(let i = 0; i < markers.length; i++) {
            map.removeLayer(markers[i]);
        }
    }
});