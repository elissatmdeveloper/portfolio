window.onload=function(){
    var tipus = ['Cria', 'Engreix', 'Femelles', 'Mascles', 'Reposició'];
    var quantitats;
    //Configurem i creem el tipus de gràfic
    const ctx = document.getElementById('grafica');
    const grafica = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: tipus,
                datasets: [{
                    label: 'Quantitat',
                    data: quantitats,
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)'
                    ]
                }],
            },
            options: {
                plugins:{
                    legend:{
                        display:false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 20,
                                weight: 'bold'
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 20,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

    /*Funció per dibuixar la gràfica*/
    function dibuixaGrafica(quantitats){
        
        grafica.data.datasets[0].data = quantitats;
        grafica.update()

    }

    //Li enviem a la gràfica unes dades d'exemple
    quantitats = [12, 19, 3, 5, 2];
    dibuixaGrafica(quantitats);
    
    let url = "https://analisi.transparenciacatalunya.cat/resource/7bpt-5azk.xml"
    
    //EXERCICI 1-1
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+
        httpRequest = new XMLHttpRequest();
        console.log("Creat l'objecte a partir de XMLHttpRequest.");
    } else if (window.ActiveXObject) { // IE 6 i anteriors
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        console.log("Creat l'objecte a partir d'ActiveXObject.");
    } else {
        console.error("Error: Aquest navegador no suporta AJAX.");
    }

    httpRequest.open('GET', url , true);
    httpRequest.onload = omplirComarques;
    httpRequest.send(null);
    
    function omplirComarques() {
        let resposta = httpRequest.responseXML;
        let elements = resposta.getElementsByTagName("comarca");
        let matriu = new Array();
        
        //recorre la matriu 'elements'
        for (let i = 0; i < elements.length; i++) {
            let elem = elements[i].textContent;
            //comprova si l'element (elem) existeix a la matriu i si no existeix l'afegeix
            if (matriu.includes(elem)){
                console.log("Aquest element ja existeix a la matriu");
            } else {
                matriu.push(elem);   
            }  
        } 
        
        omplirOption(matriu,"comarca");   
    }

    
    //EXERCICI 1-2
    let selectComarca = document.getElementById("comarca");
    selectComarca.addEventListener('change', mostrarMunicipis);
    
    function mostrarMunicipis() {            
        let comarca = selectComarca.options[selectComarca.selectedIndex];

        httpRequest.open('GET', url + "?comarca=" + comarca.text , true);
        httpRequest.onload = omplirMunicipis;
        httpRequest.send(null);

        function omplirMunicipis() {
            let resposta = httpRequest.responseXML;
            let elements = resposta.getElementsByTagName("municipi");
            let matriu = new Array();

            //recorre la matriu 'elements'
            for (let i = 0; i < elements.length; i++) {
                let elem = elements[i].textContent;
                //comprova si l'element (elem) existeix a la matriu i si no existeix l'afegeix
                if (matriu.includes(elem)){
                    console.log("Aquest element ja existeix a la matriu");
                } else {
                    matriu.push(elem);   
                }  
            } 
            removeOptions(document.getElementById("poblacio"));
            omplirOption(matriu,"poblacio");
        }
    }
    
    
    //EXERCICI 1-3
    let botoCercar = document.getElementById("cercar");
    botoCercar.onclick = mostrarDades;
    
    function mostrarDades() {  
        let selectMunicipi = document.getElementById("poblacio");
        let municipi = selectMunicipi.options[selectMunicipi.selectedIndex];
        
        //si hi ha seleccionat un municipi
        if(municipi.text != "Tria municipi...") {

            httpRequest.open('GET', url + "?municipi=" + municipi.text , true);
            httpRequest.onload = omplirDades;
            httpRequest.send(null);

            function omplirDades() {
                let resposta = httpRequest.responseXML;
                let nom = resposta.getElementsByTagName("nom_explotaci");
                let adreca = resposta.getElementsByTagName("adre_a_explotaci");
                let especie = resposta.getElementsByTagName("esp_cie");

                document.getElementById("nom").innerHTML = nom[0].textContent;
                document.getElementById("adresa").innerHTML = adreca[0].textContent;
                document.getElementById("especie").innerHTML = especie[0].textContent;
                
                //EXERCICI 1-4
                let cria = resposta.getElementsByTagName("cap_cria");
                let engreix = resposta.getElementsByTagName("cap_engreix");
                let femelles = resposta.getElementsByTagName("cap_femelles");
                let mascles = resposta.getElementsByTagName("cap_mascles");
                let resposicio = resposta.getElementsByTagName("cap_reposici");
                
                let sumaCria = 0;
                let sumaEngreix = 0;
                let sumaFemelles = 0;
                let sumaMascles = 0;
                let sumaReposicio = 0;
                
                for(let i = 0; i < cria.length; i++){
                    sumaCria += parseInt(cria[i].textContent); 
                    sumaEngreix += parseInt(engreix[i].textContent); 
                    sumaFemelles += parseInt(femelles[i].textContent); 
                    sumaMascles += parseInt(mascles[i].textContent); 
                    sumaReposicio += parseInt(resposicio[i].textContent); 
                }
                
                quantitats = new Array();
                quantitats.push(sumaCria);
                quantitats.push(sumaEngreix);
                quantitats.push(sumaFemelles);
                quantitats.push(sumaMascles);
                quantitats.push(sumaReposicio);

                console.log(quantitats);
                
                dibuixaGrafica(quantitats);
            }
        } else {
            console.log("Element no seleccionat")
        }
    }
    
    
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
    

}