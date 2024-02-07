/*
boton idiomas
traducir
conectar las paginas
Filtrar tours y reseñas 
poner algun efecto en el texto cuando cargue la pagina
poner un efecto en las cards
*/
//Llamar base de datos 

    document.addEventListener('DOMContentLoaded', getData)

    async function getData(){
        let urlData= '/BasesDeDatos/db.json'

        try {
            const response= await fetch(urlData);
            const data= await response.json()
            console.log(data)
            showTours(data.Tours);
            showReview(data.reviews);
            pageGuias(data.guias)
        } catch (error) {
            
        }
    };
//

/* Traer informacion del Local storage */
document.addEventListener('DOMContentLoaded', ()=>{

    getDataLocalStorage() 
})

function getDataLocalStorage() {
    const idGuia = JSON.parse(localStorage.getItem('idGuia'))
    return idGuia
}

let idG = getDataLocalStorage()
console.log(idG);

// Descripcion del guia

function pageGuias(guias) {

    /*ubicarnos en box para el inner */
    const nombreH2= document.querySelector('.nombreGuia');
    const descripcionP= document.querySelector('.descripcionGuia');
    const nombrePerfil= document.querySelector('.nombreGuiaPerfil');
    const tablaPerfil=document.querySelector('#tablaPerfil');
    const fotoPerfil= document.querySelector('#fotoPerfil');

    guias.forEach(guia => {

        const {id} = guia;
        console.log(id)

        if (id == idG) {

            const {foto, Nombre, edad, genero, idioma, anosExperiencia, descripcion}= guia;

            fotoPerfil.style=`background-image: url(/IMAGENES/PERSONAS/${foto})`
            nombreH2.textContent= `${Nombre}`;
            descripcionP.textContent= `${descripcion}`;
            nombrePerfil.textContent= `${Nombre}`;
            tablaPerfil.children[0].children[0].children[1].textContent=`${edad} años`;
            tablaPerfil.children[0].children[1].children[1].textContent=`${genero}`;
            tablaPerfil.children[0].children[2].children[1].textContent=`${anosExperiencia} años`;
            tablaPerfil.children[0].children[3].children[1].textContent=`50`;
            tablaPerfil.children[0].children[4].children[1].textContent=`4.8`;
            tablaPerfil.children[0].children[5].children[1].textContent=`${idioma}`;
                
        }
        
    });
    
}
   
// Cards Tours ofrecidos 

    function showTours(dataTours){

        const contenedorTours= document.querySelector('#toursOfrecidos');

        dataTours.forEach((tour)=>{
            //destructurar
            const {imagen,nombre,idGuia, tourId}= tour

            if(idGuia == idG){
                const tourHTML= document.createElement('p');
                tourHTML.innerHTML= `
                <div class="card" id="cadaCard">
                    <a href="/TourEspecifico/index.html">
                        <div class="contenedo_card_img" style="background-image: url(/IMAGENES/TOURS/${imagen});" idTour = "${tourId}">
                                    
                        </div>
                        <div class="card-body" id="h5_card">
                            <h5 class="card-title"><a><b>${nombre}</b></a></h5>
                        </div>
                    </a>
                </div>
                `
                contenedorTours.appendChild(tourHTML);
            }
            
        });

        //Boton ver mas 
        const toursOfrecidos= document.querySelector('#toursOfrecidos');
        const itemsTours= toursOfrecidos.children;
        const btnPagTours= document.querySelector('#botonMore');
        let itemsPerPage=3;
        let currentPage= 1;
        console.log(currentPage)

        document.addEventListener("DOMContentLoaded", upDatePaginacion());

        function showPage(page){
                
            for(let i= 0; i< itemsTours.length; i++){
                if(i<(page-1)*itemsPerPage || i >= page *itemsPerPage){
                        
                     itemsTours[i].style.display="none"
                }else{
                    itemsTours[i].style.display= "block";
                        
                };

            };
        };

        function upDatePaginacion(){
            showPage(currentPage);
        }
            
        btnPagTours.addEventListener('click', ()=>{
            console.log(itemsPerPage)
            
            if(itemsPerPage >= itemsTours.length){
                btnPagTours.style.display="none"
            }else{ 
                itemsPerPage+= 3;
                upDatePaginacion();
            }
             
        });
    };

    /*-------------------------------------Mostrar tours del carrusel------------------------------------------- */


const toursOfrecidos = document.querySelector('#toursOfrecidos');
toursOfrecidos.addEventListener('click', getTourData);


function getTourData(e) {
    const idTour = e.target.getAttribute('idTour');
    
    let newId = idTour;
    

    let tourId = JSON.parse(localStorage.getItem('tourId'));
    
    tourId = newId
    console.log(tourId);

    localStorage.setItem('tourId', JSON.stringify(tourId));

}






//

// Cards Reseñas 
    const contenedorReview= document.querySelector('#review')


    function showReview(reviews){
        console.log(reviews)

        //destructurar
        reviews.forEach((review)=>{
            const {idGuia,calificacion, fecha, reseña, idC, nombreC}= review

            if(idGuia == idG){
                const reviewHtml= document.createElement('p');
                reviewHtml.innerHTML= `
                <div class="card mb-3 row g-0" style="max-width: 100%;" id="cadaCardReview">
                    <div class="row g-0">
                        <div class="col-md-4 contImg img-fluid  " >
                            <div class=" fotoPerfil imgClienteRev" > </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><b>${nombreC}</b></h5>
                                <p class="card-text">${reseña}</p>
                                <div id="detalleReview">
                                    <p class="card-text"><small class="text-body-secondary">${fecha}</small></p>
                                    <p class="card-text"><small class="text-body-secondary">${calificacion}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                contenedorReview.appendChild(reviewHtml);
               
            };

            localStorage.setItem('idC', JSON.stringify(idC));

        });

        

    




        //Boton ver mas
        
            const itemsReview= contenedorReview.children;
            const sizeItemsreview= itemsReview.length
            const btnPagReview= document.querySelector('#btnMoreReview');
            let itemsPage= 3;
            let currentPageRev= 1;
            
            document.addEventListener("DOMContentLoaded", upDatePaginacionRev());
                
            function showPageRev(page){
                
                for(let j= 0; j< sizeItemsreview; j++){
                    if(j<(page-1)*itemsPage || j >= page *itemsPage){
                        itemsReview[j].style.display="none"
                    }

                    if(itemsPage> sizeItemsreview ){
                        btnPagReview.style.display="none"
                    }
                };
            };

                function upDatePaginacionRev(){
                    showPageRev(currentPageRev);
                ;}
                    
                btnPagReview.addEventListener('click', ()=>{
                    itemsPage= sizeItemsreview;
                    upDatePaginacionRev(); 
                });

        //

        //cards en el modal Review
       
            const modalBody= document.querySelector('#modalBodyRev');

            reviews.forEach((reviewMod)=>{
                const {idReview, idC, idGuia, calificacion, fecha, reseña, nombreC}= reviewMod;
                
                if(idGuia == idG){
                    const reviewModHtml= document.createElement('p');
                    //function showReview(){

                        reviewModHtml.innerHTML= `
                        <div class="card mb-3 modal-dialog modal-xl " style="max-width: 100%;" id="cadaCardModalRev">
                            <div class="row g-0 ">
                                <div class="col-md-4 contImg">
                                    <div class=" fotoPerfil imgClienteRev"> </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                    <h5 class="card-title"><b>${nombreC}</b></h5>
                                    <p class="card-text">${reseña}</p>
                                    <div id="detalleReview">
                                        <p class="card-text"><small class="text-body-secondary">${fecha}</small></p>
                                        <p class="card-text"><small class="text-body-secondary">${calificacion}</small></p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                        modalBody.appendChild(reviewModHtml);
                    }  
            });
        //
    };

//




    


