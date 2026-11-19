const misiones = [
    {
        titulo: "Misión 1: Expediente bacteriano",
        historia: "Has recibido un expediente sobre una bacteria que puede provocar infecciones intestinales. Identifica correctamente al microorganismo.",
        pregunta: "¿Qué es la Shigella spp.?",
        opciones: [
            "A) Un tipo de bacteria que puede causar diarrea",
            "B) Un virus que causa gripe",
            "C) Un hongo que afecta la piel",
            "D) Un parásito que vive en los mosquitos"
        ],
        correcta: 0,
        explicacion: "Shigella spp. es un género de bacterias bacilares Gram negativas que provoca shigelosis, una infección intestinal aguda."
    },
    {
        titulo: "Misión 2: Zona de transmisión",
        historia: "Un reporte de salud indica que varias personas presentan síntomas intestinales. Investiga cómo pudo transmitirse la bacteria.",
        pregunta: "¿Cómo puede una persona contagiarse de Shigella?",
        opciones: [
            "A) Por la picadura de un mosquito",
            "B) Al consumir agua o alimentos contaminados",
            "C) Por respirar cerca de una persona enferma",
            "D) Por tocar objetos metálicos"
        ],
        correcta: 1,
        explicacion: "Se transmite por vía fecal-oral, al ingerir agua o alimentos contaminados, o por contacto directo con manos mal lavadas."
    },
    {
        titulo: "Misión 3: Identificación de síntomas",
        historia: "Debes analizar los síntomas reportados por una persona para reconocer cuáles podrían relacionarse con una infección por Shigella.",
        pregunta: "¿Cuál de los siguientes síntomas puede indicar una infección por Shigella?",
        opciones: [
            "A) Dolor en una muela",
            "B) Pérdida del cabello",
            "C) Diarrea, dolor abdominal y fiebre",
            "D) Visión borrosa"
        ],
        correcta: 2,
        explicacion: "Los síntomas típicos incluyen diarrea (a veces con sangre o moco), cólicos abdominales intensos y fiebre."
    },
    {
        titulo: "Misión 4: Prevención y protección",
        historia: "El equipo debe preparar una campaña para evitar nuevos contagios. Selecciona la medida preventiva más adecuada.",
        pregunta: "¿Qué medida ayuda más a prevenir una infección por Shigella?",
        opciones: [
            "A) Lavarse las manos con agua y jabón",
            "B) Usar gafas de sol al salir",
            "C) Dormir más de 8 horas",
            "D) Evitar hacer ejercicio"
        ],
        correcta: 0,
        explicacion: "El lavado frecuente de manos con agua y jabón, especialmente después de ir al baño y antes de preparar alimentos, corta la cadena de transmisión."
    },
    {
        titulo: "Misión 5: Decisión responsable",
        historia: "Has llegado a la última misión. Debes explicar por qué es importante atender una infección intestinal y seguir las recomendaciones de profesionales de la salud.",
        pregunta: "¿Por qué es importante tratar una infección por Shigella y seguir las indicaciones médicas?",
        opciones: [
            "A) Porque puede causar deshidratación y empeorar si no se atiende",
            "B) Porque provoca fracturas óseas",
            "C) Porque afecta permanentemente la vista",
            "D) Porque siempre causa alergias severas"
        ],
        correcta: 0,
        explicacion: "La pérdida de líquidos puede derivar en deshidratación grave; además, evita la automedicación con antibióticos innecesarios."
    }
];

let puntos = 0;
let vidas = 3;
let misionActual = 0;
let misionesCompletadas = 0;
let respuestaElegida = false;

const inicio = document.getElementById("inicio");
const menu = document.getElementById("menu");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const puntosTexto = document.getElementById("puntos");
const vidasTexto = document.getElementById("vidas");
const avanceTexto = document.getElementById("avance");
const progreso = document.getElementById("progreso");
const listaMisiones = document.getElementById("listaMisiones");

function mostrarPantalla(pantalla) {
    inicio.classList.add("oculto");
    menu.classList.add("oculto");
    juego.classList.add("oculto");
    final.classList.add("oculto");

    pantalla.classList.remove("oculto");
}

function actualizarEstadisticas() {
    puntosTexto.textContent = puntos;
    vidasTexto.textContent = vidas;
    avanceTexto.textContent = misionesCompletadas + "/5";

    const porcentaje = (misionesCompletadas / 5) * 100;
    progreso.style.width = porcentaje + "%";
}

function construirMenu() {
    listaMisiones.innerHTML = "";

    misiones.forEach((mision, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const completada = indice < misionesCompletadas;
        const desbloqueada = indice === misionesCompletadas;

        if (!completada && !desbloqueada) {
            tarjeta.classList.add("bloqueada");
        }

        tarjeta.innerHTML = `
            <h3>🧪 ${mision.titulo}</h3>
            <p>${mision.historia}</p>
            <p class="estado">
                ${completada ? "✅ Completada" :
                  desbloqueada ? "🔓 Disponible" : "🔒 Bloqueada"}
            </p>
            <button ${desbloqueada ? "" : "disabled"}>
                ${completada ? "Completada" :
                  desbloqueada ? "Iniciar misión" : "Misión bloqueada"}
            </button>
        `;

        if (desbloqueada) {
            tarjeta.querySelector("button").addEventListener("click", () => {
                iniciarMision(indice);
            });
        }

        listaMisiones.appendChild(tarjeta);
    });

    actualizarEstadisticas();
}

function iniciarMision(indice) {
    misionActual = indice;
    respuestaElegida = false;

    const mision = misiones[indice];

    document.getElementById("numeroMision").textContent = "MISIÓN " + (indice + 1) + " DE 5";
    document.getElementById("tituloMision").textContent = mision.titulo;
    document.getElementById("historia").textContent = mision.historia;
    document.getElementById("pregunta").textContent = mision.pregunta;
    document.getElementById("retroalimentacion").textContent = "";
    document.getElementById("siguiente").classList.add("oculto");

    const opciones = document.getElementById("opciones");
    opciones.innerHTML = "";

    mision.opciones.forEach((opcion, indiceOpcion) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.className = "opcion";

        boton.addEventListener("click", () => {
            responder(indiceOpcion, boton);
        });

        opciones.appendChild(boton);
    });

    mostrarPantalla(juego);
}

function responder(indiceElegido, botonElegido) {
    if (respuestaElegida) return;
    respuestaElegida = true;

    const mision = misiones[misionActual];
    const botones = document.querySelectorAll(".opcion");
    const retroalimentacion = document.getElementById("retroalimentacion");

    botones.forEach(boton => boton.disabled = true);

    if (indiceElegido === mision.correcta) {
        puntos += 20;
        misionesCompletadas++;
        botonElegido.classList.add("correcta");

        retroalimentacion.textContent =
            "✅ ¡Excelente trabajo! Has seleccionado la respuesta correcta. " +
            mision.explicacion;
    } else {
        vidas--;
        botonElegido.classList.add("incorrecta");
        botones[mision.correcta].classList.add("correcta");

        const respuestaCorrecta = mision.opciones[mision.correcta];
        retroalimentacion.textContent =
            "❌ ¡Respuesta incorrecta! La respuesta correcta era: " +
            respuestaCorrecta + ". " + mision.explicacion;
    }

    actualizarEstadisticas();

    const botonSiguiente = document.getElementById("siguiente");
    botonSiguiente.classList.remove("oculto");

    if (vidas <= 0) {
        botonSiguiente.textContent = "Ver resultado";
    } else if (misionesCompletadas === 5) {
        botonSiguiente.textContent = "Desbloquear minijuegos 🏆";
    } else {
        botonSiguiente.textContent = "Continuar";
    }
}

function continuar() {
    if (vidas <= 0 || misionesCompletadas === 5) {
        mostrarFinal();
        return;
    }

    construirMenu();
    mostrarPantalla(menu);
}

function mostrarFinal() {
    mostrarPantalla(final);

    const mensaje = document.getElementById("mensajeFinal");
    const resultado = document.getElementById("resultadoFinal");
    const zonaMinijuegos = document.getElementById("zonaMinijuegos");

    if (misionesCompletadas === 5) {
        mensaje.textContent =
            "¡Felicidades! Completaste las cinco misiones y terminaste la investigación.";
        zonaMinijuegos.classList.remove("oculto");
        iniciarMemorama();
        iniciarRompecabezas();
    } else {
        mensaje.textContent =
            "La investigación terminó antes de completar todas las misiones. ¡Completa las 5 misiones para desbloquear los minijuegos!";
        zonaMinijuegos.classList.add("oculto");
    }

    resultado.textContent =
        "Puntuación: " + puntos + " de 100 puntos. " +
        "Misiones completadas: " + misionesCompletadas + " de 5. " +
        "Vidas restantes: " + vidas + ".";
}

function reiniciarJuego() {
    puntos = 0;
    vidas = 3;
    misionActual = 0;
    misionesCompletadas = 0;
    respuestaElegida = false;

    construirMenu();
    mostrarPantalla(menu);
}

/* =========================================================
   MINIJUEGO 1: MEMORAMA SOBRE SHIGELLA SPP.
   ========================================================= */
const paresShigella = [
    { id: 1, texto: "🧬 Shigella spp." },
    { id: 1, texto: "Bacilo Gram negativo inmóvil" },
    { id: 2, texto: "🤒 Shigelosis" },
    { id: 2, texto: "Infección intestinal aguda" },
    { id: 3, texto: "🧼 Prevención clave" },
    { id: 3, texto: "Lavado de manos con agua y jabón" },
    { id: 4, texto: "🧫 Agar MacConkey" },
    { id: 4, texto: "Colonias pálidas (no fermenta lactosa)" },
    { id: 5, texto: "💧 Riesgo principal" },
    { id: 5, texto: "Deshidratación por diarrea" },
    { id: 6, texto: "⚠️ Vía de contagio" },
    { id: 6, texto: "Fecal-oral (agua o comida contaminada)" }
];

let cartasVolteadas = [];
let bloqueoMemorama = false;
let paresHallados = 0;
let intentosMemorama = 0;

function iniciarMemorama() {
    const tablero = document.getElementById("tableroMemorama");
    tablero.innerHTML = "";
    cartasVolteadas = [];
    bloqueoMemorama = false;
    paresHallados = 0;
    intentosMemorama = 0;

    document.getElementById("paresEncontrados").textContent = "0/6";
    document.getElementById("intentosMemorama").textContent = "0";
    document.getElementById("mensajeMemorama").textContent = "";

    const baraja = [...paresShigella].sort(() => Math.random() - 0.5);

    baraja.forEach((item) => {
        const carta = document.createElement("div");
        carta.className = "carta-memorama";
        carta.dataset.id = item.id;
        carta.dataset.texto = item.texto;
        carta.textContent = "🔬 ?";

        carta.addEventListener("click", () => voltearCarta(carta));
        tablero.appendChild(carta);
    });
}

function voltearCarta(carta) {
    if (bloqueoMemorama || carta.classList.contains("volteada") || carta.classList.contains("emparejada")) {
        return;
    }

    carta.classList.add("volteada");
    carta.textContent = carta.dataset.texto;
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
        intentosMemorama++;
        document.getElementById("intentosMemorama").textContent = intentosMemorama;
        bloqueoMemorama = true;

        const [c1, c2] = cartasVolteadas;
        if (c1.dataset.id === c2.dataset.id) {
            c1.classList.add("emparejada");
            c2.classList.add("emparejada");
            cartasVolteadas = [];
            bloqueoMemorama = false;
            paresHallados++;
            document.getElementById("paresEncontrados").textContent = `${paresHallados}/6`;

            if (paresHallados === 6) {
                document.getElementById("mensajeMemorama").textContent =
                    "🎉 ¡Excelente! Dominas los conceptos bacteriológicos de Shigella spp.";
            }
        } else {
            setTimeout(() => {
                c1.classList.remove("volteada");
                c2.classList.remove("volteada");
                c1.textContent = "🔬 ?";
                c2.textContent = "🔬 ?";
                cartasVolteadas = [];
                bloqueoMemorama = false;
            }, 900);
        }
    }
}

/* =========================================================
   MINIJUEGO 2: ROMPECABEZAS DESLIZANTE (3x3)
   ========================================================= */
// Cambia a true si guardas shigella1.jpg, shigella2.jpg y shigella3.jpg en tu carpeta
const usarImagenesLocales = false;

const imagenesLocales = [
    "shigella1.jpg",
    "shigella2.jpg",
    "shigella3.jpg"
];

// Ilustraciones vectoriales integradas (funcionan sin archivos externos)
const imagenesSVG = [
    "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#3b0910"/><circle cx="150" cy="150" r="130" fill="#5c0e18" stroke="#ff4d5a" stroke-width="6"/><rect x="70" y="90" width="75" height="28" rx="14" transform="rotate(25 70 90)" fill="#ff6b76" stroke="#fff" stroke-width="2"/><rect x="155" y="135" width="80" height="28" rx="14" transform="rotate(-15 155 135)" fill="#ff4d5a" stroke="#fff" stroke-width="2"/><rect x="90" y="180" width="75" height="28" rx="14" transform="rotate(-30 90 180)" fill="#ff8fa3" stroke="#fff" stroke-width="2"/><text x="150" y="265" font-family="Arial" font-size="16" font-weight="bold" fill="#fff" text-anchor="middle">BACILOS SHIGELLA SPP.</text></svg>`),
    "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#4a0d16"/><circle cx="150" cy="135" r="85" fill="#ffccd5"/><path d="M110 150 Q150 95 190 150 Q150 195 110 150 Z" fill="#d92638"/><circle cx="120" cy="110" r="12" fill="#fff"/><circle cx="175" cy="105" r="15" fill="#fff"/><circle cx="150" cy="85" r="10" fill="#fff"/><text x="150" y="255" font-family="Arial" font-size="16" font-weight="bold" fill="#fff" text-anchor="middle">LAVADO DE MANOS</text><text x="150" y="275" font-family="Arial" font-size="12" fill="#ffb3ba" text-anchor="middle">AGUA Y JABÓN</text></svg>`),
    "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#2b090e"/><circle cx="150" cy="145" r="105" fill="#b81d2d" stroke="#ffb3ba" stroke-width="6"/><circle cx="115" cy="115" r="12" fill="#fff0f3" opacity="0.85"/><circle cx="165" cy="110" r="10" fill="#fff0f3" opacity="0.85"/><circle cx="140" cy="155" r="14" fill="#fff0f3" opacity="0.85"/><circle cx="185" cy="165" r="11" fill="#fff0f3" opacity="0.85"/><circle cx="110" cy="175" r="9" fill="#fff0f3" opacity="0.85"/><text x="150" y="278" font-family="Arial" font-size="15" font-weight="bold" fill="#fff" text-anchor="middle">AGAR MACCONKEY</text></svg>`)
];

let estadoPuzzle = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 8 es el espacio vacío
let imagenActualPuzzle = 0;

function obtenerUrlImagenPuzzle() {
    return usarImagenesLocales ? imagenesLocales[imagenActualPuzzle] : imagenesSVG[imagenActualPuzzle];
}

function iniciarRompecabezas() {
    document.getElementById("imagenGuia").src = obtenerUrlImagenPuzzle();
    mezclarRompecabezas();
}

function mezclarRompecabezas() {
    estadoPuzzle = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    document.getElementById("mensajePuzzle").textContent = "";

    // Realizar 60 movimientos válidos aleatorios para garantizar que tenga solución
    let vacio = 8;
    for (let i = 0; i < 60; i++) {
        const vecinos = obtenerVecinos(vacio);
        const aleatorio = vecinos[Math.floor(Math.random() * vecinos.length)];
        [estadoPuzzle[vacio], estadoPuzzle[aleatorio]] = [estadoPuzzle[aleatorio], estadoPuzzle[vacio]];
        vacio = aleatorio;
    }
    renderizarRompecabezas();
}

function obtenerVecinos(indice) {
    const vecinos = [];
    const fila = Math.floor(indice / 3);
    const col = indice % 3;

    if (fila > 0) vecinos.push(indice - 3);
    if (fila < 2) vecinos.push(indice + 3);
    if (col > 0) vecinos.push(indice - 1);
    if (col < 2) vecinos.push(indice + 1);
    return vecinos;
}

function renderizarRompecabezas() {
    const tablero = document.getElementById("tableroRompecabezas");
    tablero.innerHTML = "";
    const urlImg = obtenerUrlImagenPuzzle();

    estadoPuzzle.forEach((valor, indice) => {
        const pieza = document.createElement("div");
        pieza.className = "pieza-puzzle";

        if (valor === 8) {
            pieza.classList.add("pieza-vacia");
        } else {
            const filaOrig = Math.floor(valor / 3);
            const colOrig = valor % 3;
            pieza.style.backgroundImage = `url('${urlImg}')`;
            pieza.style.backgroundPosition = `-${colOrig * 100}px -${filaOrig * 100}px`;
            pieza.addEventListener("click", () => moverPieza(indice));
        }

        tablero.appendChild(pieza);
    });
}

function moverPieza(indice) {
    const indiceVacio = estadoPuzzle.indexOf(8);
    const vecinos = obtenerVecinos(indiceVacio);

    if (vecinos.includes(indice)) {
        [estadoPuzzle[indiceVacio], estadoPuzzle[indice]] = [estadoPuzzle[indice], estadoPuzzle[indiceVacio]];
        renderizarRompecabezas();
        verificarVictoriaPuzzle();
    }
}

function verificarVictoriaPuzzle() {
    const ganado = estadoPuzzle.every((val, idx) => val === idx);
    if (ganado) {
        document.getElementById("mensajePuzzle").textContent =
            "🎉 ¡Rompecabezas completado! Has reconstruido la muestra científica.";
    }
}

/* =========================================================
   EVENTOS PRINCIPALES
   ========================================================= */
document.getElementById("comenzar").addEventListener("click", () => {
    construirMenu();
    mostrarPantalla(menu);
});

document.getElementById("siguiente").addEventListener("click", continuar);

document.getElementById("salirMenu").addEventListener("click", () => {
    construirMenu();
    mostrarPantalla(menu);
});

document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

// Eventos de navegación entre los 2 minijuegos
document.getElementById("btnAbrirMemorama").addEventListener("click", () => {
    document.getElementById("contenedorMemorama").classList.remove("oculto");
    document.getElementById("contenedorRompecabezas").classList.add("oculto");
});

document.getElementById("btnAbrirRompecabezas").addEventListener("click", () => {
    document.getElementById("contenedorRompecabezas").classList.remove("oculto");
    document.getElementById("contenedorMemorama").classList.add("oculto");
});

document.getElementById("reiniciarMemorama").addEventListener("click", iniciarMemorama);

document.getElementById("selectorImagen").addEventListener("change", (e) => {
    imagenActualPuzzle = parseInt(e.target.value, 10);
    iniciarRompecabezas();
});

document.getElementById("mezclarPuzzle").addEventListener("click", mezclarRompecabezas);
