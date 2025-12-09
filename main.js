// main.js - manejo de carrito compartido en Green Shot Golf Store

document.addEventListener("DOMContentLoaded", function () {
    const btnCarrito = document.getElementById("btnCarrito");
    const carritoCantidad = document.getElementById("carritoCantidad");
    const carritoPanel = document.getElementById("carritoPanel");
    const carritoLista = document.getElementById("carritoLista");
    const carritoTotal = document.getElementById("carritoTotal");
    const carritoCerrar = document.getElementById("carritoCerrar");

    const CLAVE_CARRITO = "carritoGreenShot";

    function obtenerCarrito() {
        try {
            const data = localStorage.getItem(CLAVE_CARRITO);
            if (!data) return {};
            return JSON.parse(data);
        } catch (e) {
            return {};
        }
    }

    function guardarCarrito(carrito) {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    }

    function cantidadTotal(carrito) {
        return Object.values(carrito).reduce((acc, item) => acc + item.cantidad, 0);
    }

    function totalCarrito(carrito) {
        return Object.values(carrito).reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    }

    function formatearPesos(valor) {
        return "$" + valor.toFixed(2);
    }

    function actualizarBadge() {
        const carrito = obtenerCarrito();
        const cant = cantidadTotal(carrito);
        if (carritoCantidad) {
            carritoCantidad.textContent = cant;
        }
    }

    function renderCarrito() {
        const carrito = obtenerCarrito();
        const items = Object.values(carrito);

        if (!carritoLista || !carritoTotal) return;

        if (items.length === 0) {
            carritoLista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
            carritoTotal.textContent = "";
            return;
        }

        let html = "";
        items.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            html += `
                <div class="carrito-item">
                    <div class="carrito-item-nombre">${item.nombre}</div>
                    <div class="carrito-item-detalle">
                        <div>${formatearPesos(item.precio)} x ${item.cantidad}</div>
                        <div><strong>${formatearPesos(subtotal)}</strong></div>
                    </div>
                </div>
            `;
        
    const btnVaciar = document.getElementById("carritoVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", function () {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify({}));
            actualizarBadge();
            renderCarrito();
        
    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }


    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});


        carritoLista.innerHTML = html;
        carritoTotal.textContent = "Total: " + formatearPesos(totalCarrito(carrito));
    }

    function agregarAlCarrito(id, nombre, precio) {
        if (!id) return;
        const carrito = obtenerCarrito();
        if (!carrito[id]) {
            carrito[id] = { id, nombre, precio: Number(precio), cantidad: 0 };
        }
        carrito[id].cantidad += 1;
        guardarCarrito(carrito);
        actualizarBadge();
    }

    // Inicializar badge al cargar
    if (carritoCantidad) {
        actualizarBadge();
    }

    // Eventos de botones "Agregar al carrito" (si existen en la página)
    const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", function () {
            const id = boton.getAttribute("data-id");
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            agregarAlCarrito(id, nombre, precio);
            renderCarrito();
            if (carritoPanel && !carritoPanel.classList.contains("mostrar")) {
                carritoPanel.classList.add("mostrar");
            }
        
    const btnVaciar = document.getElementById("carritoVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", function () {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify({}));
            actualizarBadge();
            renderCarrito();
        
    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }


    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    
    const btnVaciar = document.getElementById("carritoVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", function () {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify({}));
            actualizarBadge();
            renderCarrito();
        
    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }


    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});


    // Mostrar / ocultar panel del carrito
    if (btnCarrito && carritoPanel) {
        btnCarrito.addEventListener("click", function () {
            if (carritoPanel.classList.contains("mostrar")) {
                carritoPanel.classList.remove("mostrar");
            } else {
                renderCarrito();
                carritoPanel.classList.add("mostrar");
            }
        
    const btnVaciar = document.getElementById("carritoVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", function () {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify({}));
            actualizarBadge();
            renderCarrito();
        
    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }


    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }

    if (carritoCerrar && carritoPanel) {
        carritoCerrar.addEventListener("click", function () {
            carritoPanel.classList.remove("mostrar");
        
    const btnVaciar = document.getElementById("carritoVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", function () {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify({}));
            actualizarBadge();
            renderCarrito();
        
    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }


    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }

    const btnVaciar = document.getElementById("carritoVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", function () {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify({}));
            actualizarBadge();
            renderCarrito();
        
    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});

    }


    

    // ---- Carrusel de inicio ----
    const carrusel = document.getElementById("carruselInicio");
    if (carrusel) {
        const imagenes = carrusel.querySelectorAll(".carrusel-imagen");
        const dots = carrusel.querySelectorAll(".carrusel-dot");
        const btnPrev = carrusel.querySelector('.carrusel-btn[data-dir="prev"]');
        const btnNext = carrusel.querySelector('.carrusel-btn[data-dir="next"]');
        let indiceActual = 0;
        let intervalo = null;

        function mostrar(i) {
            imagenes.forEach((img, idx) => img.classList.toggle("activa", idx === i));
            dots.forEach((dot, idx) => dot.classList.toggle("activo", idx === i));
            indiceActual = i;
        }

        function siguiente() { mostrar((indiceActual + 1) % imagenes.length); }
        function anterior() { mostrar((indiceActual - 1 + imagenes.length) % imagenes.length); }

        btnNext.addEventListener("click", () => { siguiente(); reiniciar(); });
        btnPrev.addEventListener("click", () => { anterior(); reiniciar(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => { mostrar(idx); reiniciar(); });
        });

        function iniciar() {
            intervalo = setInterval(siguiente, 3000); // cada 3 segundos
        }

        function reiniciar() {
            clearInterval(intervalo);
            iniciar();
        }

        iniciar();
        mostrar(0);
    }
});
