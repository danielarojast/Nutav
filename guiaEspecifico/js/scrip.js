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
            showGuias(data.guias);
            showTours(data.Tours);
            showReview(data.reviews);
            //showCustomers(data.customers);
        } catch (error) {
            
        }
    };

//Descripcion del Guia

    function showGuias(dataGuias){

        const nombreH2= document.querySelector('.nombreGuia');
        const descripcionP= document.querySelector('.descripcionGuia');
        const nombrePerfil= document.querySelector('.nombreGuiaPerfil');
        const tablaPerfil=document.querySelector('#tablaPerfil');

        //guias.forEach....
        const{foto, id, Nombre, Edad, genero, procedencia, idioma, anosExperiencia, descripcion}= dataGuias[0];

        nombreH2.textContent= `${Nombre}`;
        descripcionP.textContent= `${descripcion}`;
        nombrePerfil.textContent= `${Nombre}`;
        tablaPerfil.children[0].children[0].children[1].textContent=`${Edad} años`;
        tablaPerfil.children[0].children[1].children[1].textContent=`${genero}`;
        tablaPerfil.children[0].children[2].children[1].textContent=`${anosExperiencia} años`;
        tablaPerfil.children[0].children[3].children[1].textContent=`50`;
        tablaPerfil.children[0].children[4].children[1].textContent=`4.8`;
        tablaPerfil.children[0].children[5].children[1].textContent=`${idioma}`;
        //
    };  
//
   
// Cards Tours ofrecidos 

    function showTours(dataTours){

        const contenedorTours= document.querySelector('#toursOfrecidos');

        dataTours.forEach((tour)=>{
            //destructurar
            const {imagen,nombre,idTour,idGuia,descripcion}= tour

            const tourHTML= document.createElement('p');
            tourHTML.innerHTML= `
            <div class="card" id="cadaCard">
                <a href="#">
                <div class="contenedo_card_img">
                    <img src="/IMAGENES/TOURS/${imagen}" class="card-img-top img_card" id="img_card" alt="...">
                </div>
                <div class="card-body" id="h5_card">
                    <h5 class="card-title"><a><b>${nombre}</b></a></h5>
                </div>
                </a>
            </div> 
            `
            contenedorTours.appendChild(tourHTML);
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
//

// Cards Reseñas 
    const contenedorReview= document.querySelector('#review')

    function showReview(reviews){
        console.log(reviews)

        //destructurar
        reviews.forEach((review)=>{
            const {calificacion, fecha, reseña}= review

            const reviewHtml= document.createElement('p');
            reviewHtml.innerHTML= `
            <div class="card mb-3 row g-0" style="max-width: 100%;" id="cadaCardReview">
                <div class="row g-0">
                    <div class="col-md-4 contImg img-fluid  " >
                        <div class=" fotoPerfil imgClienteRev"> </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title"><b>Sofia Toro</b></h5>
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
                const {idReview, idC, idGuia, calificacion, fecha, reseña}= reviewMod;
        
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
                                <h5 class="card-title"><b>Sofia Toro</b></h5>
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
            });
        //
    };
//



    
   
