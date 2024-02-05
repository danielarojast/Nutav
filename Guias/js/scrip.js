//Llamar la base de datos de los guias

    document.addEventListener('DOMContentLoaded',getDatos);

    async function getDatos(){
        let url='/BasesDeDatos/db.json'

        try {
            const response = await fetch(url);
            const datos= await response.json();
            console.log(datos.guias)
            showGuias(datos.guias);
            showAge(datos.guias);
            showLanguage(datos.guias);
            showGenero(datos.guias);
            showExperience(datos.guias);
        } catch (error) {
            
        };
    };


    //insertar elementos del select
    function showAge(ageData){
        const age = document.querySelector('#age');

        //edades sin repetir
        const edadOnce = [...new Set(ageData.map(guia => guia.edad))];
        edadOnce.forEach(edad=>{
            const option = document.createElement('option');
            option.value = edad;
            option.text = edad;

            age.appendChild(option);

        })
    }

    function showLanguage(languageData){
        const language = document.querySelector('#language');

    const languageOnce = [...new Set(languageData.flatMap(guia => guia.idioma))];

    languageOnce.forEach(idioma => {
        const option = document.createElement('option');
        option.value = idioma;
        option.text = idioma;

        language.appendChild(option);
        
    });

    }

    function showGenero(generoData){
        const gener = document.querySelector('#genero');
        const generoOnce = [...new Set(generoData.flatMap(guia => guia.genero))];
        generoOnce.forEach(genero =>{
            const option = document.createElement('option');
            option.value = genero;
            option.text = genero;

            gener.appendChild(option)
        })
    }


    function showExperience(experienceData){
        const experience = document.querySelector('#experience');

    // Ordena los objetos según la propiedad 'duracion' de menor a mayor
    experienceData.sort((a, b) => parseFloat(a.anosExperiencia) - parseFloat(b.anosExperiencia));

    const experienceOnce = [...new Set(experienceData.map(guia=> guia.anosExperiencia))];

    experienceOnce.forEach(experienceTime => {
        const option = document.createElement('option');
        option.value = experienceTime;
        option.text = experienceTime;

        experience.appendChild(option);
           
    });
    }


/*--------------------------FILTRAR RESULTADOS----------------------*/


/* insertar guias */ 

function showGuias(dat){
        
    //Insertar Cards de guias

        const contentGuiasPrin= document.querySelector('#guiasPrincipales');
        const contentAllGuias= document.querySelector('#allGuias');
        clean();

        dat.forEach(dato => {
            
            const{foto, id, Nombre}= dato;
                
            //Guias principales
            const cardsGuias= document.createElement('p');
            cardsGuias.classList.add("psita")

            cardsGuias.innerHTML += `
            <div class="card" style="width: 18rem;">
                    <a href="../guiaEspecifico/index.html">
                        <div class="imagenGuia" style="background-image:url(/IMAGENES/PERSONAS/${foto}) ;" idGuia = ${id}></div>
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${Nombre}</h5>
                        
                    </div>
                </div>
            `;
            contentGuiasPrin.appendChild(cardsGuias);
            

            //Total Guias
            const cardsAllGuias= document.createElement('p');
            cardsAllGuias.classList.add("psita")
    
            cardsAllGuias.innerHTML += `
            <div class="card" style="width: 18rem;">
                    <a href="../guiaEspecifico/index.html">
                        <div class="imagenGuia" style="background-image:url(/IMAGENES/PERSONAS/${foto}) ;" idGuia = ${id}></div>
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${Nombre}</h5>
                        
                    </div>
                </div>
            `;
            contentAllGuias.appendChild(cardsAllGuias);
        });
    //

    //Para ocultar las cards principales que solo aparezca una fila

        const itemsGuiasP= contentGuiasPrin.children;
        console.log(itemsGuiasP.length)
        let itemsPage = 5;

        document.addEventListener("DOMContentLoaded", showCards());

        function showCards(){

            for(let i = 0; i< itemsGuiasP.length; i++){
                if(i<0 || i>= itemsPage){
                    itemsGuiasP[i].style.display="none"
                }else{
                    itemsGuiasP[i].style.display= "block";
                };
            }
        };
    //

    //Ocultar las cards que ya mostre para que no se repitan y poner limite de cards
        
    const itemsAllGuias= contentAllGuias.children;
    const btnMoreGuias= document.querySelector('#btnMoreGuias');

    let itemsAllPage= 25;

    document.addEventListener('DOMContentLoaded', showAllCards());

    function showAllCards(){
        console.log(itemsAllGuias.length)
        for(let j = 0; j< itemsAllGuias.length; j++){
            console.log(j)
            if(j<itemsPage || j>= itemsAllPage){
                itemsAllGuias[j].style.display="none"
            }else{
                itemsAllGuias[j].style.display= "block";
            }
        } 
        
        if(itemsAllPage>= itemsAllGuias.length){
            btnMoreGuias.style.display="none"
        };

        btnMoreGuias.addEventListener('click', ()=>{
            itemsAllPage += 10;
            showAllCards();
        })  
        
    };
}


/*Enviar la info a pagina de guia especifico  */

const guiasPrincipales = document.querySelector('#guiasPrincipales');
guiasPrincipales.addEventListener('click', getDataGuia);

const allGuias = document.querySelector('#allGuias');
allGuias.addEventListener('click',getDataGuia);

function getDataGuia(e) {

    idGuia = e.target.getAttribute('idGuia');
    
    localStorage.setItem('idGuia', JSON.stringify(idGuia));
 
}


 const criteriosSeleccionados = {
    edad: "",
    idioma: "",
    genero: "",
    experiencia: ""
}

const edad = document.querySelector('#age');
const idioma = document.querySelector('#language');
const genero = document.querySelector('#genero');
const experiencia = document.querySelector('#experience');

edad.addEventListener('input', (e)=>{
    criteriosSeleccionados.edad = e.target.value;
    filtrarTour();  
});

idioma.addEventListener('input', (e)=>{
    criteriosSeleccionados.idioma = e.target.value;
    filtrarTour(); 
});

genero.addEventListener('input', (e)=>{
    criteriosSeleccionados.genero = e.target.value;
    filtrarTour(); 
});

experiencia.addEventListener('input',(e)=>{
    criteriosSeleccionados.experiencia = e.target.value;
    filtrarTour(); 

})


function filtrarTour(){
    fetch('/BasesDeDatos/db.json')
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((guides)=>{
    const resultado = guides.guias
    .filter(filtrarEdad)
    .filter(filtrarIdioma)
    .filter(filtrarGenero)
    .filter(filtrarExperiencia)
   
    showGuias(resultado)
    })

}

function filtrarEdad(guia) {
    if (criteriosSeleccionados.edad) {
        return guia.edad === parseInt(criteriosSeleccionados.edad);
        
    }else{
        return guia
    }
    }
    

function filtrarGenero(guia) {
    if (criteriosSeleccionados.genero) {
        return guia.genero.toLowerCase() === criteriosSeleccionados.genero.toLowerCase();
        
    }else{
        return guia;
    }
    
};

function filtrarIdioma(guia) {
    if (criteriosSeleccionados.idioma) {
        return guia.idioma.includes(criteriosSeleccionados.idioma)
        
    }else{
        return guia;
    };
    
};

function filtrarExperiencia(guia) {
    if (criteriosSeleccionados.experiencia) {
        return guia.experiencia === parseInt(criteriosSeleccionados.experiencia)
        
    }else{
        return guia
    }
    
};

function clean() {
    let z = document.querySelectorAll('.psita');
    for(let v = 0; v < z.length; v++){
        z[v].remove();
    }
}


const search = document.querySelector('#filtros');
search.addEventListener('click',mostrarFiltrado)

function mostrarFiltrado(e) {
    const audiovisualContainer = document.querySelector('#audio-visual-destacado');
    audiovisualContainer.classList.add('hidden')
    const guiaElegido = document.querySelector('#texto-guia-elegido');
    guiaElegido.classList.add('hidden') 

} 