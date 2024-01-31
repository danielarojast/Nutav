
/* Event Listener */

document.addEventListener('DOMContentLoaded', ()=>{

    /* Ingreso de Categorias para el filtro */
    getDataCategories();
    /*Ingreso lugares, idioma y duración de recorridos Filter */
    getDataSelects();


    showTours()
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

        mixRandom(data.Tours)
        culturaRandom(data.Tours)
        innovadoresRandom(data.Tours)
        gastronomicosRandom(data.Tours)
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

    <div class="modal-bbody" style="background-image: url(/IMAGENES/TOURS/${imagen});" >
        <div class="imagen-modal">
            
                            
        </div>
        <div class="modal-body-right degraded-modal ">
            

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

/*---------------------------------------------------------------------------- LANDING------------------------------------------------------------------------------------ */


/*------------Cambio de Landing a Filtrado---------------- */
const search = document.querySelector('#search');
search.addEventListener('click',mostrarFiltrado)

function mostrarFiltrado(e) {
    const cardsContainer = document.querySelector('#cards-container');
    cardsContainer.classList.remove('hidden')
    const landingTours = document.querySelector('#landingTours');
    landingTours.classList.add('hidden') 

    const inicio = e.target.getAttribute('value');
    

    if (inicio === "Inicio") {
        const cardsContainer = document.querySelector('#cards-container');
        cardsContainer.classList.add('hidden')
        const landingTours = document.querySelector('#landingTours');
        landingTours.classList.remove('hidden') 
    }

}

/*-------------------------------------------------------- */

/*---------------Mix Categorías------------- */

function mixRandom(tours) {
    console.log(tours);

    let mix = tours.sort(() => Math.random() - 0.5).slice(0,4)
    console.log(mix);

    const mixedTours = document.querySelector('#mixedTours');

   mix.forEach(tour => {

    const {imagen,nombre,descripcion, tourId, idGuia} = tour;

    mixedTours.innerHTML += `
    <div>
        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal" >
            <div class="card" style="background-image: url(/IMAGENES/TOURS/${imagen}) ;" imagen = ${imagen} nombre = "${nombre}" descripcion = "${descripcion}" tourId = ${tourId} idGuia = ${idGuia}>
                <div class="degraded">
                    <p><strong>${nombre}</strong></p>
                </div>
            </div>
        </a>
    </div> 
    ` 
   });
}

/*----------------------------------------------------------- */

/*--------------Grid de Cultura e Historia------------- */

function culturaRandom(tours) {
    const categoriasMix = ["Cultura", "Historia"];

    const toursFiltrados = tours.filter(tour => tour.categorias.some(categoria => categoriasMix.includes(categoria)));
    const toursAleatorios = toursFiltrados.sort(() => Math.random() - 0.5).slice(0, 5);

    console.log(toursAleatorios);

    let t1 = toursAleatorios[0]
    let t2 = toursAleatorios[1]
    let t3 = toursAleatorios[2]
    let t4 = toursAleatorios[3]
    let t5 = toursAleatorios[4]

    const mixCultura = document.querySelector('#mixCultura')

        mixCultura.innerHTML = `
        <div class="grid-container">
                    <!-- Celda 1 -->
                    <div class="item item1">
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t1.imagen});" imagen = ${t1.imagen} nombre = "${t1.nombre}" descripcion = "${t1.descripcion}" tourId = ${t1.tourId} idGuia = ${t1.idGuia}>
                                <div class="degraded">
                                    <p><strong>${t1.nombre}</strong></p>
                                </div>

                            </div>

                        </a>
                    </div>
                    <!-- Celda 2 -->
                    <div class="item item2">
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t2.imagen});" imagen = ${t2.imagen} nombre = "${t2.nombre}" descripcion = "${t2.descripcion}" tourId = ${t2.tourId} idGuia = ${t2.idGuia}>
                                <div class="degraded">
                                    <p><strong>${t2.nombre}</strong></p>
                                </div>

                            </div>

                        </a>
                    </div>
                    <!-- Celda 3 -->
                    <div class="item item3">
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t3.imagen});" imagen = ${t3.imagen} nombre = "${t3.nombre}" descripcion = "${t3.descripcion}" tourId = ${t3.tourId} idGuia = ${t3.idGuia}>
                                <div class="degraded">
                                    <p><strong>${t3.nombre}</strong></p>
                                </div>

                            </div>

                        </a>
                    </div>
                    <!-- Celda 4 -->
                    <div class="item item4">
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t4.imagen});" imagen = ${t4.imagen} nombre = "${t4.nombre}" descripcion = "${t4.descripcion}" tourId = ${t4.tourId} idGuia = ${t4.idGuia}>
                                <div class="degraded">
                                    <p><strong>${t4.nombre}</strong></p>
                                </div>

                            </div>

                        </a>
                    </div>
                    <!-- Celda 5 -->
                    <div class="item item5">
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t5.imagen});" imagen = ${t5.imagen} nombre = "${t5.nombre}" descripcion = "${t5.descripcion}" tourId = ${t5.tourId} idGuia = ${t5.idGuia}>
                                <div class="degraded">
                                    <p><strong>${t5.nombre}</strong></p>
                                </div>

                            </div>

                        </a>
                    </div>
                   
                </div>
        `
}

/*---------------------------------------------------------- */

/*-----------------Grid de Innovacion---------------------- */

function innovadoresRandom(tours) {
    const categoriasMix = ["Innovador", "Deporte"];

    const toursFiltrados = tours.filter(tour => tour.categorias.some(categoria => categoriasMix.includes(categoria)));
    const toursAleatorios = toursFiltrados.sort(() => Math.random() - 0.5).slice(0, 4);

    console.log(toursAleatorios);

    let t1 = toursAleatorios[0];
    let t2 = toursAleatorios[1];
    let t3 = toursAleatorios[2];
    let t4 = toursAleatorios[3];

    const mixInnovadores = document.querySelector('#mixInnovadores');

    mixInnovadores.innerHTML = `
    <div class="grid-container-Innovadores">
        <div class="item item1a">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t1.imagen});" imagen = ${t1.imagen} nombre = "${t1.nombre}" descripcion = "${t1.descripcion}" tourId = ${t1.tourId} idGuia = ${t1.idGuia}>
                    <div class="degraded">
                        <p><strong>${t1.nombre}</strong></p>
                    </div>
                </div>
            </a>
        </div>
        <div class="item item2a">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t2.imagen});" imagen = ${t2.imagen} nombre = "${t2.nombre}" descripcion = "${t2.descripcion}" tourId = ${t2.tourId} idGuia = ${t2.idGuia}>
                    <div class="degraded">
                        <p><strong>${t2.nombre}</strong></p>
                    </div>

                </div>

            </a>
        </div>
        <div class="item item3a">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t3.imagen});" imagen = ${t3.imagen} nombre = "${t3.nombre}" descripcion = "${t3.descripcion}" tourId = ${t3.tourId} idGuia = ${t3.idGuia}>
                    <div class="degraded">
                        <p><strong>${t3.nombre}</strong></p>
                    </div>

                </div>

            </a>
        </div>
        <div class="item item4a">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t4.imagen});" imagen = ${t4.imagen} nombre = "${t4.nombre}" descripcion = "${t4.descripcion}" tourId = ${t4.tourId} idGuia = ${t4.idGuia}>
                    <div class="degraded">
                        <p><strong>${t4.nombre}</strong></p>
                    </div>

                </div>

            </a>
        </div>  
    </div>
    `   
}

/*---------------------------------------------------------- */

/*--------------------Gastronómicos y de Cata-------------------*/

function gastronomicosRandom(tours) {

    const categoriasMix = ["Gastronomía","Cultura"];

    const toursFiltrados = tours.filter(tour => tour.categorias.some(categoria => categoriasMix.includes(categoria)));
    const toursAleatorios = toursFiltrados.sort(() => Math.random() - 0.5).slice(0, 5);

    console.log(toursAleatorios);

    let t1 = toursAleatorios[0]
    let t2 = toursAleatorios[1]
    let t3 = toursAleatorios[2]
    let t4 = toursAleatorios[3]
    let t5 = toursAleatorios[4]

    const mixGastronomicos = document.querySelector('#mixGastronomicos');
    mixGastronomicos.innerHTML = `
    <div class="grid-container-gastronomia">
        <div class="item item1b">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t1.imagen});" imagen = ${t1.imagen} nombre = "${t1.nombre}" descripcion = "${t1.descripcion}" tourId = ${t1.tourId} idGuia = ${t1.idGuia}>
                    <div class="degraded">
                        <p><strong>${t1.nombre}</strong></p>
                    </div>
                </div>
            </a>
        </div>
        <div class="item item2b">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t2.imagen});" imagen = ${t2.imagen} nombre = "${t2.nombre}" descripcion = "${t2.descripcion}" tourId = ${t2.tourId} idGuia = ${t2.idGuia}>
                    <div class="degraded">
                        <p><strong>${t2.nombre}</strong></p>
                    </div>
            
                </div>
            
            </a>
        </div>
        <div class="item item3b">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t3.imagen});" imagen = ${t3.imagen} nombre = "${t3.nombre}" descripcion = "${t3.descripcion}" tourId = ${t3.tourId} idGuia = ${t3.idGuia}>
                    <div class="degraded">
                        <p><strong>${t3.nombre}</strong></p>
                    </div>
            
                </div>
            
            </a>
        </div>
        <div class="item item4b">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t4.imagen});" imagen = ${t4.imagen} nombre = "${t4.nombre}" descripcion = "${t4.descripcion}" tourId = ${t4.tourId} idGuia = ${t4.idGuia}>
                    <div class="degraded">
                        <p><strong>${t4.nombre}</strong></p>
                    </div>
            
                </div>
            
            </a>
        </div>
        <div class="item item5b">
            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-grid" style="background-image: url(/IMAGENES/TOURS/${t5.imagen});" imagen = ${t5.imagen} nombre = "${t5.nombre}" descripcion = "${t5.descripcion}" tourId = ${t5.tourId} idGuia = ${t5.idGuia}>
                    <div class="degraded">
                        <p><strong>${t5.nombre}</strong></p>
                    </div>

                </div>
            </a>
        </div>
    </div>
    `
}







/*------------------------------------------------------------ */


const landingTours = document.querySelector('#landingTours');
landingTours.addEventListener('click', showDetail)