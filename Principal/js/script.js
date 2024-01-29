
/* Event Listener */

document.addEventListener('DOMContentLoaded', ()=>{

    /* Ingreso de Categorias para el filtro */
    getDataCategories();
    /*Ingreso lugares, idioma y duración de recorridos Filter */
    getDataSelects();


    showTours(tours)
    //selectedTour()

});




/*Ingreso de Selects y Categorias al Filtrado*/

function getDataCategories() {

    

    fetch('/BasesDeDatos/db.json')
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((dataCategories) =>{
        console.log(dataCategories);
        showCategories(dataCategories.Categories)

    })
    
};

function showCategories(categoriesData) {
    const categories = document.querySelector('#categories');
    let html = "";

    categoriesData.forEach(category => {
        const {categoryName,categoryIcon} = category
        html += `
        <div class="category-btn">
            <div class = "categoryIcons">
                <img src="/IMAGENES/ICONOSYLOGOS/categoriasFiltro/${categoryIcon}" alt="" srcset="">
            </div>
            <option value="${categoryName}">${categoryName}</option>
        </div>
        `
        
    });
    
    categories.innerHTML = html;
};



function getDataSelects() {

    fetch('/BasesDeDatos/db.json')
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((data)=>{
        showPlaces(data.Tours);
        showLanguages(data.Tours);
        showDuration(data.Tours);

        /* Ingreso de cards tours */
        showTours(data.Tours)
    })
    
}


function showPlaces(placesData) {
    const place = document.querySelector('#place');

    /*Lista de lugares sin repetir */
    const lugaresOnce = [...new Set(placesData.map(tour => tour.lugar))];
    //console.log(lugaresOnce);

    lugaresOnce.forEach(lugar => {
        const option = document.createElement('option');
        option.value = lugar;
        option.text = lugar;

        place.appendChild(option);

    }); 
}

function showLanguages(languageData) {
    const language = document.querySelector('#language');

    const languageOnce = [...new Set(languageData.flatMap(tour => tour.idioma))];
    //console.log(languageOnce);

    languageOnce.forEach(idioma => {
        const option = document.createElement('option');
        option.value = idioma;
        option.text = idioma;

        language.appendChild(option);
        
    });
    
}

function showDuration(durationData) {
    const duracion = document.querySelector('#duracion');

    // Ordena los objetos según la propiedad 'duracion' de menor a mayor
    durationData.sort((a, b) => parseFloat(a.duracion) - parseFloat(b.duracion));

    const durationOnce = [...new Set(durationData.map(tour=> tour.duracion))];
    console.log(durationOnce);

    durationOnce.forEach(duration => {
        const option = document.createElement('option');
        option.value = duration;
        option.text = duration;

        duracion.appendChild(option);
           
    });
}

/*-------------------------------------------------------------------------------------------------*/

/* Función para inyectar cards*/

function showTours(tours) {

    const contenedorCards = document.querySelector('#cards-container');
    clean();
    
    tours.forEach((tour) => {

        const {imagen,nombre,descripcion, tourId, idGuia} = tour;

        const tourHtml = document.createElement('p');
        tourHtml.classList.add("psita")
     
        tourHtml.innerHTML = `
            <div>
                <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    <div class="card" style="background-image: url(/IMAGENES/TOURS/${imagen}) ;" imagen = ${imagen} nombre = "${nombre}" descripcion = "${descripcion}" tourId = ${tourId} idGuia = ${idGuia}>
                        <div class="degraded">
                            <p><strong>${nombre}</strong></p>
                        </div>
                    </div>
                </a>
            </div>
        `;

        contenedorCards.appendChild(tourHtml);
        console.log(contenedorCards);


        
    });
    
}


const criteriosSeleccionados = {
    categoria: "",
    lugar: "",
    idioma: "",
    duracion: "",
    estado: ""
}

const categoria = document.querySelector('#categories');
const lugar = document.querySelector('#place');
const idioma = document.querySelector('#language');
const duracion = document.querySelector('#duracion');
const estado = document.querySelector('#availability');

categoria.addEventListener('click',(e)=>{
    
    criteriosSeleccionados.categoria = e.target.value;
    console.log(criteriosSeleccionados.categoria);
    filtrarTour();  
});

lugar.addEventListener('input', (e)=>{
    criteriosSeleccionados.lugar = e.target.value;
    filtrarTour(); 
});

idioma.addEventListener('input', (e)=>{
    criteriosSeleccionados.idioma = e.target.value;
    filtrarTour(); 
});

duracion.addEventListener('input',(e)=>{
    criteriosSeleccionados.duracion = e.target.value;
    filtrarTour(); 

})


function filtrarTour(){
    fetch('/BasesDeDatos/db.json')
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((tours)=>{
      
    const resultado = tours.Tours
    .filter(filtrarCategory)
    .filter(filtrarLugar)
    .filter(filtrarIdioma)
    .filter(filtrarDuracion)
   
    showTours(resultado)
    })

}

function filtrarCategory(tour) {
    if (criteriosSeleccionados.categoria) {
        return tour.categorias.includes(criteriosSeleccionados.categoria)   
    }else{
        return tour;
    }
    
};

function filtrarLugar(tour) {
    if (criteriosSeleccionados.lugar) {
        return tour.lugar === criteriosSeleccionados.lugar
        
    }else{
        return tour;
    }
    
};

function filtrarIdioma(tour) {
    if (criteriosSeleccionados.idioma) {
        return tour.idioma.includes(criteriosSeleccionados.idioma)
        
    }else{
        return tour;
    };
    
};

function filtrarDuracion(tour) {
    if (criteriosSeleccionados.duracion) {
        return tour.duracion === criteriosSeleccionados.duracion
        
    }else{
        return tour
    }
    
}

function clean() {
    let z = document.querySelectorAll('.psita');
    for(let v = 0; v < z.length; v++){
        z[v].remove();
    }

    
}


const modalBody = document.querySelector('.modal-content'); 
const infoModal = document.createElement('div')


const tourDetails = document.querySelector('#cards-container')
tourDetails.addEventListener('click', showDetail)


function showDetail(e) {
    const imagen = e.target.getAttribute('imagen');
    const nombre = e.target.getAttribute('nombre');
    const descripcion = e.target.getAttribute('descripcion');
    const tourId = e.target.getAttribute('tourId')
    const idGuia = e.target.getAttribute('idGuia')

    console.log(tourId);
    infoModal.innerHTML = `

    <div class="modal-bbody" >
        <div class="imagen-modal" style="background-image: url(/IMAGENES/TOURS/${imagen});">
            <div class="degraded-modal">

            </div>
                            
        </div>
        <div class="modal-body-right">
            <div >
                <h1>${nombre}</h1>
            </div>
            <div class="detalle">
                <p style="color: white;">${descripcion}</p>
            </div>
        
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>
                <a href = "../TourEspecifico/index.html" type="button" class="btn btn-primary" tourId = ${tourId} idGuia = ${idGuia}>Ver mas</a>
            </div> 

        </div>
    </div>
    `;
    modalBody.appendChild(infoModal)
}

/* PASAR INFO A PAGINA ESPECIFICA DEL TOUR */

const modalContent = document.querySelector('.modal-content');
modalContent.addEventListener('click', getDataModal);

function getDataModal(e) {
    const tourId = e.target.getAttribute('tourId')
    const idGuia = e.target.getAttribute('idGuia')
    console.log(tourId);
    localStorage.setItem('tourId',JSON.stringify(tourId));
    localStorage.setItem('idGuia',JSON.stringify(idGuia))
    
}






