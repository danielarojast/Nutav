


/* Event Listener */

document.addEventListener('DOMContentLoaded', ()=>{

    showTours(tours)
    console.log(criteriosSeleccionados)
    selectedTour()

})

/* Función para inyectar cards*/

function showTours(tours) {

    const contenedorCards = document.querySelector('#cards-container');
    clean();
    
    tours.forEach((tour) => {

        const {imagen,nombre,descripcion} = tour;

        const tourHtml = document.createElement('p');
        tourHtml.classList.add("psita")
     
        tourHtml.innerHTML = `
            <div>
                <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal" imagen = ${imagen} nombre = "${nombre}" descripcion = "${descripcion}">
                    <div class="card" style="background-image: url(assets/landing/toursImg/${imagen}) ;">
                        <div class="degraded">
                            <p><strong>${nombre}</strong></p>
                        </div>
                    </div>
                </a>
            </div>
        `;

        contenedorCards.appendChild(tourHtml);


        
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
    const resultado = tours
    .filter(filtrarCategory)
    .filter(filtrarLugar)
    .filter(filtrarIdioma)
    .filter(filtrarDuracion)
    console.log(resultado)
    showTours(resultado)
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

function selectedTour() {
    const tourDetails = document.querySelector('#cards-container')
    tourDetails.addEventListener('click', showDetail)
}

function showDetail(e) {
    const anchorElement = e.target.closest('a');
    
    if (anchorElement) {
        // Retrieve the 'imagen' attribute from the 'a' tag
        const imagen = anchorElement.getAttribute('imagen');
        const nombre = anchorElement.getAttribute('nombre')
        const descripcion = anchorElement.getAttribute('descripcion')
    infoModal.innerHTML = `

    <div class="modal-bbody" >
        <div class="imagen-modal" style="background-image: url(/assets/landing/toursImg/${imagen});">
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
                <a href = "http://127.0.0.1:3002/index.html" type="button" class="btn btn-primary">Ver mas</a>
            </div> 

        </div>
    </div>
    `;
    modalBody.appendChild(infoModal)
    }
}