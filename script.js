

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
        explicacion: "Shigella spp. es un grupo de bacterias que puede provocar infecciones intestinales. Estas infecciones suelen causar diarrea, dolor abdominal y, en algunos casos, fiebre."
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
        explicacion: "La forma más común de contagio es al consumir agua o alimentos contaminados con la bacteria o por una higiene deficiente de las manos después de usar el baño."
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
        explicacion: "La infección por Shigella afecta principalmente al intestino. Por eso los síntomas más frecuentes son diarrea, cólicos o dolor abdominal y, en ocasiones, fiebre."
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
        explicacion: "Lavarse correctamente las manos antes de comer y después de usar el baño es una de las formas más efectivas de prevenir la transmisión de esta bacteria."
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
        explicacion: "La diarrea intensa puede hacer que la persona pierda mucho líquido y se deshidrate. Por eso es importante mantenerse hidratado y seguir las recomendaciones de un profesional de la salud."
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

        const desbloqueada = indice <= misionesCompletadas;

        if (!desbloqueada) {
            tarjeta.classList.add("bloqueada");
        }

        tarjeta.innerHTML = `
            <h3>🧪 Misión ${indice + 1}: ${mision.titulo}</h3>
            <p>${mision.historia}</p>
            <p class="estado">
                ${indice < misionesCompletadas ? "✅ Completada" :
                  desbloqueada ? "🔓 Disponible" : "🔒 Bloqueada"}
            </p>
            <button ${desbloqueada ? "" : "disabled"}>
                ${indice < misionesCompletadas ? "Revisar misión" :
                  desbloqueada ? "Iniciar misión" : "Misión bloqueada"}
            </button>
        `;

        const boton = tarjeta.querySelector("button");

        if (desbloqueada) {
            boton.addEventListener("click", () => iniciarMision(indice));
        }

        listaMisiones.appendChild(tarjeta);
    });

    actualizarEstadisticas();
}

function iniciarMision(indice) {
    misionActual = indice;
    respuestaElegida = false;

    const mision = misiones[indice];

    document.getElementById("numeroMision").textContent =
        "MISIÓN " + (indice + 1) + " DE 5";

    document.getElementById("tituloMision").textContent =
        mision.titulo;

    document.getElementById("historia").textContent =
        mision.historia;

    document.getElementById("pregunta").textContent =
        mision.pregunta;

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
    const retroalimentacion =
        document.getElementById("retroalimentacion");

    botones.forEach(boton => boton.disabled = true);

    if (indiceElegido === mision.correcta) {
        puntos += 20;
        misionesCompletadas++;

        botonElegido.classList.add("correcta");

        retroalimentacion.textContent =
            "✅ ¡Respuesta correcta! " + mision.explicacion;

    } else {
        vidas--;

        botonElegido.classList.add("incorrecta");
        botones[mision.correcta].classList.add("correcta");

        retroalimentacion.textContent =
            "❌ Respuesta incorrecta. " + mision.explicacion;
    }

    actualizarEstadisticas();

    const botonSiguiente = document.getElementById("siguiente");
    botonSiguiente.classList.remove("oculto");

    if (vidas <= 0) {
        botonSiguiente.textContent = "Ver resultado";
    } else if (misionesCompletadas === 5) {
        botonSiguiente.textContent = "Terminar aventura";
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

    if (misionesCompletadas === 5) {
        mensaje.textContent =
            "¡Felicidades! Completaste las cinco misiones y terminaste la investigación.";
    } else {
        mensaje.textContent =
            "La investigación terminó antes de completar todas las misiones. ¡Puedes intentarlo nuevamente!";
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
            <h3>🧪 Misión ${indice + 1}: ${mision.titulo}</h3>
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
    mostrarPantalla(menu);
}

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