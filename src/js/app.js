document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});


function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrolNav();
};

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){

        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        };
    })
};

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagen');

    for(let i=1;i<=12;i++){
        const img = document.createElement('picture');
        img.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" src="img/thumb/${i}.jpg" alt="imagenes galeria">
        `;
        //pongo la funcion adentro de otra simulando un colback
        // esto hace que no se mande a llamar sola la funcion
        // sino que se llama cuando le doy click 
        img.onclick = function(){
            mostrarImg(i);
        };

        galeria.appendChild(img);
    };
}; 

function mostrarImg(id){
    const img = document.createElement('picture');
    img.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" src="img/grande/${id}.jpg" alt="imagenes galeria">
    `;

    // crea el overlay con la imagen
    const overlay = document.createElement('div')
    overlay.appendChild(img);
    overlay.classList.add('overlay');
    overlay.onclick= function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    // boton para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    overlay.appendChild(cerrarModal);

    // añadirlo al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
};

function scrolNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
};