//Llamar la base de datos de los guias

    document.addEventListener('DOMContentLoaded', getDatos());

    async function getDatos(){
        let url='/BasesDeDatos/db.json'

        try {
            const response = await fetch(url);
            const datos= await response.json();
            console.log(datos.guias)
            showGuias(datos.guias);
        } catch (error) {
            
        };
    };
//

function showGuias(dat){
        
    //Insertar Cards de guias

        const contentGuiasPrin= document.querySelector('#guiasPrincipales');
        const contentAllGuias= document.querySelector('#allGuias');

        dat.forEach(dato => {
            
            const{foto, id, Nombre, Edad, genero, anosExperiencia, descripcion, idioma, procedencia}= dato;
                
            //Guias principales
            const cardsGuias= document.createElement('p');

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
        }else{
            btnMoreGuias.style.display="block"
        }

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