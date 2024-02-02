function createArrayCalendar(currentMonth, calendar) {

    //inicializar variables principales del calendario 
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();


    let startDayOfWeek = firstDayOfMonth.getDay();
    if (startDayOfWeek === 0) {
        startDayOfWeek = 7; // Cambia el Domingo (0) a 7 para representar Lunes
    } else {
        startDayOfWeek--; // Resta 1 para representar Lunes como el primer día (0 = Lunes)
    }
    calendar = [];

    let currentWeek = [];
    let inicialStateDay = { eventId: 1, day: 0, month: '', event: false, availableSlots: 0, today: false, status: '', soon: false }
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    // Llena la matriz con los días del mes anterior
    let dayOfMonth = (daysInPreviousMonth - (startDayOfWeek == 7 ? startDayOfWeek - 1 : startDayOfWeek)) + 1;
    for (let i = 1; i <= (startDayOfWeek == 7 ? startDayOfWeek - 1 : startDayOfWeek); i++) {
        const dateFormated = new Date(year, month - 1, dayOfMonth).toISOString().slice(0, 10);
        currentWeek.push({ ...inicialStateDay, day: dayOfMonth, month: 'anterior', date: dateFormated });
        dayOfMonth++;
    }
    // Llena la matriz con los días del mes actual
    for (let day = 1; day <= numDaysInMonth; day++) {
        if (currentWeek.length === 7) {
            calendar.push(currentWeek);
            currentWeek = [];
        }
        //check if day is today
        const fechaActual = new Date();
        const hoy = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        // const estado = day < new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'pasado' : 'disponible';
        const estado =
            (year < fechaActual.getFullYear()) ||
                (year === fechaActual.getFullYear() && month < fechaActual.getMonth()) ||
                (year === fechaActual.getFullYear() && month === fechaActual.getMonth() && day < fechaActual.getDate())
                ? 'pasado'
                : 'disponible';
        const dateFormated = new Date(year, month, day).toISOString().slice(0, 10);
        currentWeek.push({ ...inicialStateDay, day: day, month: 'actual', today: hoy, status: estado, date: dateFormated });
    }
    // Llena la matriz con los días del mes siguiente
    dayOfMonth = 1; // Día del mes siguiente
    while (currentWeek.length < 7) {
        const dateFormated = new Date(year, month + 1, dayOfMonth).toISOString().slice(0, 10);
        currentWeek.push({ ...inicialStateDay, day: dayOfMonth, month: 'siguiente', date: dateFormated });
        dayOfMonth++;
    }
    calendar.push(currentWeek);
    return calendar;
}



document.addEventListener('DOMContentLoaded', function () {
    let currentMonth = new Date((new Date).getFullYear(), (new Date).getMonth(), 1);
    let calendar = [];
    // crea el calendario retornando el calendanrio actual
    calendar = createArrayCalendar(currentMonth, calendar);

    // renderiza el calendario
    renderCalendar(calendar, currentMonth);
});

function renderCalendar(calendar, currentMonth) {
    //antes de pintar el calendario revisar los eventos
    // obtiene los eventos
    const events = getEvents();
    // recorre el calendario y agrega los eventos
    calendar.forEach(week => {
        week.forEach(day => {
            const event = events.find(e => e.date === day.date);
            if (event) {
                day.event = true;
                day.availableSlots = event.availableSlots;
            }
        });
    }
    );

    let container = document.getElementById('calendar');

    container.innerHTML = `
    <div class="calendar_header">
        <span id="prevMonth"> < </span>
        <h3>${currentMonth.toLocaleString('es-ES', { month: 'long' }).toUpperCase()} ${currentMonth.getFullYear()}</h3>
        
        <span id="nextMonth"> > </span>

    </div>
    <table class="table table-bordered">
    <thead>
        <tr class="week_day_names">
            <th>Lun</th>
            <th>Mar</th>
            <th>Mie</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sab</th>
            <th>Dom</th>
        </tr>
    </thead>
    <tbody>
        ${calendar.map(week =>
        `<tr class="week_day_numbers"> 
            ${week.map(day => `<td class="${day.today ? 'today' : ''} ${day.event ? 'active' : ''}">
                <div class="day">${day.day}</div></td>`).join('')
        }
            </tr>`).join('')
        }
    </tbody>
</table>
    `;

    document.getElementById('prevMonth').addEventListener('click', () => {
        nextMonth(currentMonth);
    }
    );
    document.getElementById('nextMonth').addEventListener('click', () => {
        prevMonth(currentMonth);
    }
    );

}


function getEvents() {
    const events = [
        {
            id: 1,
            date: '2024-01-18',
            availableSlots: 20
        },
        {
            id: 2,
            date: '2024-01-19',
            availableSlots: 2
        },
        {
            id: 3,
            date: '2024-01-22',
            availableSlots: 14
        },
        {
            id: 4,
            date: '2024-01-23',
            availableSlots: 8
        }
    ]
    return events;
}

function nextMonth(currentMonth) {
    currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
    calendar = createArrayCalendar(currentMonth, calendar);
    renderCalendar(calendar, currentMonth);
}

function prevMonth(currentMonth) {
    currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    calendar = createArrayCalendar(currentMonth, calendar);
    renderCalendar(calendar, currentMonth);
}



document.addEventListener('DOMContentLoaded', () => {
    getData();
    getProducts();
})



//DESCRIPCION TOUR
async function getData() {
    let url = "/BasesDeDatos/db.json"
    try {
        const respuesta = await fetch(url)
        const datos = await respuesta.json()
        mostrarProductos(datos.Tours);
        showReview(datos.reviews);

    } catch (error) {
        console.log(error);
    }

};


// Cards Reseñas 
const contenedorReview = document.querySelector('#review')

function showReview(reviews) {

    //destructurar
    reviews.forEach((review) => {
        const { calificacion, fecha, reseña } = review

        const reviewHtml = document.createElement('p');
        reviewHtml.innerHTML = `
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

    const itemsReview = contenedorReview.children;
    const sizeItemsreview = itemsReview.length
    const btnPagReview = document.querySelector('#btnMoreReview');
    let itemsPage = 3;
    let currentPageRev = 1;

    document.addEventListener("DOMContentLoaded", upDatePaginacionRev());

    function showPageRev(page) {

        for (let j = 0; j < sizeItemsreview; j++) {
            if (j < (page - 1) * itemsPage || j >= page * itemsPage) {
                itemsReview[j].style.display = "none"
            }

            if (itemsPage > sizeItemsreview) {
                btnPagReview.style.display = "none"
            }
        };
    };

    function upDatePaginacionRev() {
        //const totalPage= Math.ceil(itemsReview.length / itemsPageRev);
        showPageRev(currentPageRev);
        ;
    }

    btnPagReview.addEventListener('click', () => {
        itemsPage = sizeItemsreview;
        upDatePaginacionRev();
    });


    //cards en el modal Review

    const modalBody = document.querySelector('#modalBodyRev');

    reviews.forEach((reviewMod) => {
        const { idReview, idC, idGuia, calificacion, fecha, reseña } = reviewMod;

        const reviewModHtml = document.createElement('p');
        //function showReview(){

        reviewModHtml.innerHTML = `
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
};


/* TRAER INFO DEL MODAL  */

document.addEventListener('DOMContentLoaded', () => {
    getDataJson()
    getDataLocalStorageTour()
    getDataLocalStorageGuia()

});

function getDataJson() {
    fetch('/BasesDeDatos/db.json')
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((data) => {

            pageTour(data.Tours)
            guiaInfo(data.guias)
            mostrarProductos(data.Tours)
        })

}


function getDataLocalStorageTour() {
    const tourId = JSON.parse(localStorage.getItem('tourId'))
    return tourId
}

function getDataLocalStorageGuia() {
    const idGuia = JSON.parse(localStorage.getItem('idGuia'))
    return idGuia

}

let idT = getDataLocalStorageTour()
console.log(idT);

let idG = getDataLocalStorageGuia()
console.log(idG);

function pageTour(tours) {

    const portada = document.querySelector('.portada');
    const descrip = document.querySelector('.descripcion');
    const observacion = document.querySelector('.texto-table');
    const precioTour = document.querySelector('.precio')
    const botonesContact = document.querySelector('.botonesContact');


    tours.forEach(tour => {
        const { descripcion, imagen, nombre, duracion, tourId, galeria, observaciones, precio} = tour

        if (tourId === idT) {

            portada.innerHTML = `
            <div class="galeria">
                <div class="im1 caja" style="background-image: url(/IMAGENES/TOURS/${galeria[0]})">
                </div>
                <div class="im2 caja" style="background-image: url(/IMAGENES/TOURS/${galeria[1]})">
                </div>
                <div class="im3 caja" style="background-image: url(/IMAGENES/TOURS/${galeria[2]})">
                </div>
                <div class="im4 caja" style="background-image: url(/IMAGENES/TOURS/${galeria[3]})">
                </div>
                <div class="im5 caja" style="background-image: url(/IMAGENES/TOURS/${galeria[4]})">
            </div>
            </div>
            <div class="title">
                <h1><strong>${nombre}</strong></h1>
            </div>
            <div class="subtitle">
                <h3>${duracion}</h3>
            </div>
            `
        }

        if (tourId === idT) {

            descrip.innerHTML = `
            <h3>Descripción</h3>
            <hr>
            <p>${descripcion}</p>
            `
        }

        if(tourId === idT){
            observacion.innerHTML = `
            <ul>
                <li>${observaciones[0]}</li>
                <li>${observaciones[1]}</li>
                <li>${observaciones[2]}</li>
            </ul>
            `
        }
        if(tourId === idT){
            precioTour.innerHTML = `
            <p><strong>Precio</strong></p>
            <h2><strong>${precio}</strong></h2>
            `
        }


    });
}


function guiaInfo(guias) {

    const infoGuia = document.querySelector('.info-guia');
    guias.forEach(guia => {
        const { foto, Nombre, descripcion, id } = guia
        if (id === idG) {
            infoGuia.innerHTML = `
            <br>
            <div class="guia-container">
                <div class="guia">
                    <div class="imagenGuia">
                        
                        <div class="titleGuia">
                            <h3>Guia Nutav</h3>
                        </div>

                        <div class="guia-imagen" style="background-image: url(/IMAGENES/PERSONAS/${foto});"> 
                        </div>
                        
                        <h4><strong>${Nombre}</strong></h4>
                    </div>
                    <div class="descripcionGuia">
                        <p>${descripcion}</p>
                        <div class="botonesContact">
                            <div class="botonnes">
                                <a href="../guiaEspecifico/index.html" class="profile" idGuia = ${id}>Ver Perfil</a>
                                <a href="" class="contact">Contactame</a>
                            </div>  
                        </div> 

                    </div>
                </div> 
            </div>
            `
        }
    })
}


/*-----------------------------------CARRUSEL--------------------------------------- */

// Propiedad para controlar la posición actual del carrusel
var posicionActual = 0;
var toursDB = [];

function getProducts() {
    fetch('/BasesDeDatos/db.json')
        .then(respuesta => {
            return respuesta.json()
        })
        .then(datos => {
            toursDB = datos.Tours;
            mostrarProductos(toursDB)

        })
}


// Función para mostrar los productos en el carrusel
function mostrarProductos(tour) {
    const container = document.querySelector('#cards-container');
    container.innerHTML = '';

    for (var i = posicionActual; i < posicionActual + 4; i++) {
        if (tour[i]) {
            let producto = tour[i];
            const divProducto = document.createElement('div');
            divProducto.innerHTML = `
                <div>
                <a href="">
                    <div class="card" style="background-image: url(/IMAGENES/TOURS/${producto.imagen}) ;"  idGuia=${producto.idGuia}  idTour =${producto.tourId}>
                        <div class="degraded">
                            <p>${producto.nombre}</p>
                        </div>
                    </div>
                </a>
                <br>
                <h5>Desde <strong>${producto.precio}</strong></h5>
            </div>
            `;
            container.appendChild(divProducto);
        }
    }

}


// Función para mover el carrusel hacia adelante o atrás
function moverCarrusel(direccion) {

    posicionActual += direccion;

    if (posicionActual < 0) {
        posicionActual = toursDB.length - 4;
    } else if (posicionActual > toursDB.length - 4) {
        posicionActual = 0;
    }

    mostrarProductos(toursDB);
}

/*-------------------------------------Mostrar tours del carrusel------------------------------------------- */


const cardContainer = document.querySelector('#cards-container');
cardContainer.addEventListener('click', getTourData);


function getTourData(e) {
    const idTour = e.target.getAttribute('idTour');
    const idGuia =  e.target.getAttribute('idGuia');
    console.log(idGuia);
    let newId = idTour;
    let newIdG = idGuia

    let tourId = JSON.parse(localStorage.getItem('tourId'));
    let guiaId = JSON.parse(localStorage.getItem('idGuia'));

    guiaId = newIdG
    tourId = newId
    console.log(tourId);

    localStorage.setItem('tourId', JSON.stringify(tourId));
    localStorage.setItem('idGuia', JSON.stringify(guiaId));

    window.location.reload();
}













