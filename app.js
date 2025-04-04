const tituloCancion = document.getElementById('tituloCancion');
const nombreArtista = document.getElementById('nombreArtista');
const progreso = document.getElementById('progreso');
const cancion = new Audio();
let canciones = [];
let indiceCancionActual = 0;

document.getElementById('musica-input').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    canciones = files.map(file => ({
        titulo: file.name.replace(/\.[^/.]+$/, ""),
        fuente: URL.createObjectURL(file)
    }));
    actualizarPlayer();
});

function actualizarPlayer() {
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = '';
    canciones.forEach((cancionItem, index) => {
        const li = document.createElement('li');
        li.textContent = `${cancionItem.titulo}`;
        li.addEventListener('click', () => {
            indiceCancionActual = index;
            reproducirCancion();
        });
        playerContainer.appendChild(li);
    });
}

function reproducirCancion() {
    cancion.src = canciones[indiceCancionActual].fuente;
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    cancion.play();
    actualizarBotonReproducirPausar(true); // Cambia el ícono al reproducir
}

function actualizarBotonReproducirPausar(estado) {
    const botonReproducirPausar = document.querySelector('.boton-reproducir-pausar');
    if (estado) {
        botonReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>'; // Pausa
    } else {
        botonReproducirPausar.innerHTML = '<i class="bi bi-play-fill"></i>'; // Reproducir
    }
}

document.querySelector('.boton-reproducir-pausar').addEventListener('click', () => {
    if (cancion.paused) {
        reproducirCancion();
    } else {
        cancion.pause();
        actualizarBotonReproducirPausar(false); // Cambia el ícono al pausar
    }
});

cancion.addEventListener('timeupdate', () => {
    progreso.value = (cancion.currentTime / cancion.duration) * 100 || 0;
});

progreso.addEventListener('input', () => {
    cancion.currentTime = (progreso.value / 100) * cancion.duration;
});

document.querySelector('.adelante').addEventListener('click', () => {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    reproducirCancion();
});

document.querySelector('.atras').addEventListener('click', () => {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    reproducirCancion();
});