/*
ocultar botones ver mas 
Terminar log in 
terminar estilos en general
boton idiomas
traducir
footer
conectar las paginas
Filtrar tours y reseñas 
poner algun efecto en el texto cuando cargue la pagina
poner las cards como botones
poner un efecto en las cards
poner la imagen de la card como background como ensayo 

*/
//Llamar base de datos 

    document.addEventListener('DOMContentLoaded', ()=>{
        getData();
    })

    function getData(){
        let urlData= '/BasesDeDatos/db.json'

        fetch(urlData)
        .then(rtaData=>{
            console.log(rtaData)
            return rtaData.json();
        })
        .then(data=>{
            console.log(data.guias)
            showGuias(data.guias);
            showTours(data.Tours);
        })
    }

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
                <a hre>
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
        const totalItemsTours= itemsTours.length;
        const btnPagTours= document.querySelector('#botonMore');
        let itemsPerPage=3;
        let currentPage= 1;

        document.addEventListener("DOMContentLoaded", function(){
            upDatePaginacion(); 
        });

            function showPage(page){
                for(let i= 0; i< itemsTours.length; i++){
                    if(i<(page-1)*itemsPerPage || i >= page *itemsPerPage){
                        itemsTours[i].style.display="none";
                    }else{
                        itemsTours[i].style.display= "block";
                    };
                };
            };

            function upDatePaginacion(){
                //const totalPage= Math.ceil(itemsTours.length / itemsPerPage);
                showPage(currentPage);
            }
            
            btnPagTours.addEventListener('click', ()=>{
                itemsPerPage+= 3;
                upDatePaginacion(); 
            });
    };

    


    
//

// Cards Reseñas 
    const contenedorReview= document.querySelector('#review')
    //destructurar
    reviews.forEach((review)=>{
        const {idReview, idC, idGuia, calificacion, fecha, reseña}= review

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
        const btnPagReview= document.querySelector('#btnMoreReview');
        let itemsPageRev= 3;
        let currentPageRev= 1;

        document.addEventListener("DOMContentLoaded", function(){
            upDatePaginacionRev(); 
            activeModalRev();
        });

            function showPageRev(page){
                for(let j= 0; j< itemsReview.length; j++){
                    if(j<(page-1)*itemsPageRev || j >= page *itemsPageRev){
                        itemsReview[j].style.display="none";
                    };
                };
            }

            function upDatePaginacionRev(){
                //const totalPage= Math.ceil(itemsReview.length / itemsPageRev);
                showPageRev(currentPageRev);
            ;}
                
            btnPagReview.addEventListener('click', ()=>{
                itemsPageRev= itemsReview.length;
                upDatePaginacionRev(); 
            });
  
    //cards en el modal Review
        const modalBody= document.querySelector('#modalBodyRev');

        function activeModalRev(){
            const contReview= document.querySelector('#review');
            contReview= addEventListener('click', showReview);
        };

        function showReview(){
            reviews.forEach((reviewMod)=>{
                const {idReview, idC, idGuia, calificacion, fecha, reseña}= reviewMod;
        
                const reviewModHtml= document.createElement('p');
                //function showReview(){

                    reviewModHtml.innerHTML= `
                    <div class="card mb-3 modal-dialog modal-xl " style="max-width: 540px;" id="cadaCardModalRev">
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
        };
//



        
        

    
   
