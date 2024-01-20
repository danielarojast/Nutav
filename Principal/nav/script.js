const itemsReview = contenedorReview.children;
const btnPagReview = document.querySelector('#btnMoreReview');
let itemsPageRev = 3;
let currentPageRev = 1;

document.addEventListener("DOMContentLoaded", function () {
    upDatePaginacionRev();
    activeModalRev();
});

function showPageRev(page) {
    for (let j = 0; j < itemsReview.length; j++) {
        if (j < (page - 1) * itemsPageRev || j >= page * itemsPageRev) {
            itemsReview[j].style.display = "none";
        };
    };
}

function upDatePaginacionRev() {
    //const totalPage= Math.ceil(itemsReview.length / itemsPageRev);
    showPageRev(currentPageRev);
    ;
}

btnPagReview.addEventListener('click', () => {
    itemsPageRev = itemsReview.length;
    upDatePaginacionRev();
});

//cards en el modal Review
const modalBody = document.querySelector('#modalBodyRev');

function activeModalRev() {
    const contReview = document.querySelector('#review');
    contReview = addEventListener('click', showReview);
};