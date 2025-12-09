// promociones.js - lógica de promociones en Green Shot Golf Store

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-promociones");
    const selectPromo = document.getElementById("promo");
    const selectProducto = document.getElementById("producto");
    const spanPrecioUnitario = document.getElementById("precioUnitario");

    const descripcionPromo = document.getElementById("descripcionPromo");
    const spanTotalSinDesc = document.getElementById("totalSinDesc");
    const spanDescuento = document.getElementById("descuento");
    const spanTotalFinal = document.getElementById("totalFinal");
    const spanTotalAhorrado = document.getElementById("totalAhorrado");
    const mensajeExtra = document.getElementById("mensajeExtra");
    const btnAgregarPromoCarrito = document.getElementById("btnAgregarPromoCarrito");

    const PRODUCTOS = {
        pelotas: { nombre: "Pack 12 pelotas de golf", precio: 18000 },
        guante: { nombre: "Guante de golf antideslizante", precio: 9500 },
        bolsa: { nombre: "Bolsa de golf", precio: 54000 },
        bolsaCompleta: { nombre: "Bolsa de golf completa con palos", precio: 120000 }
    };

    const COMBO_GUANTE_PELOTAS = {
        nombre: "Combo guante + pelotas",
        precioGuante: PRODUCTOS.guante.precio,
        precioPelotas: PRODUCTOS.pelotas.precio
    };

    let totalAhorradoAcumulado = 0;

    // Para poder agregar la última promo calculada al carrito:
    let ultimaPromo = null;
    let ultimoProductoId = null;
    let ultimaCantidad = 0;
    let ultimoTotalFinal = 0;

    function formatearPesos(valor) {
        return "$" + valor.toFixed(2);
    }

    function actualizarDescripcion() {
        const promo = selectPromo.value;
        switch (promo) {
            case "2x50":
                descripcionPromo.textContent = "En cada par de unidades del mismo producto, la segunda tiene 50% de descuento.";
                break;
            case "3x2":
                descripcionPromo.textContent = "Llevás 3 unidades del mismo producto y pagás sólo 2.";
                break;
            case "10mas30":
                descripcionPromo.textContent = "Si el total supera los $30.000, se aplica un 10% de descuento.";
                break;
            case "comboGYP":
                descripcionPromo.textContent = "Comprando el combo guante + pelotas, una de las dos unidades va gratis (se descuenta la de menor precio). La cantidad indica cuántos combos llevás.";
                break;
            default:
                descripcionPromo.textContent = "Seleccioná una promoción y un producto para ver los detalles.";
        }
    }

    function actualizarPrecioUnitario() {
        const promo = selectPromo.value;
        const productoId = selectProducto.value;

        // Para el combo, mostramos el precio del combo
        if (promo === "comboGYP") {
            const precioCombo = COMBO_GUANTE_PELOTAS.precioGuante + COMBO_GUANTE_PELOTAS.precioPelotas;
            spanPrecioUnitario.textContent = formatearPesos(precioCombo);
            return;
        }

        const producto = PRODUCTOS[productoId];
        if (producto) {
            spanPrecioUnitario.textContent = formatearPesos(producto.precio);
        } else {
            spanPrecioUnitario.textContent = "$0";
        }
    }

    selectPromo.addEventListener("change", function () {
        actualizarDescripcion();
        actualizarPrecioUnitario();
    });

    selectProducto.addEventListener("change", function () {
        actualizarPrecioUnitario();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const promo = selectPromo.value;
        const productoId = selectProducto.value;
        const cantidad = parseInt(document.getElementById("cantidad").value);

        if (!promo) {
            alert("Por favor, seleccioná un tipo de promoción.");
            return;
        }

        if (promo !== "comboGYP" && !productoId) {
            alert("Por favor, seleccioná un producto.");
            return;
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, ingresá una cantidad válida.");
            return;
        }

        let totalSinDescuento = 0;
        let descuento = 0;
        let totalFinal = 0;
        mensajeExtra.textContent = "";

        if (promo === "comboGYP") {
            const precioCombo = COMBO_GUANTE_PELOTAS.precioGuante + COMBO_GUANTE_PELOTAS.precioPelotas;
            totalSinDescuento = precioCombo * cantidad;
            const descuentoPorCombo = Math.min(COMBO_GUANTE_PELOTAS.precioGuante, COMBO_GUANTE_PELOTAS.precioPelotas);
            descuento = descuentoPorCombo * cantidad;
            totalFinal = totalSinDescuento - descuento;
            mensajeExtra.textContent = `Aplicaste ${cantidad} combo(s) guante + pelotas. Cada combo tiene una unidad gratis.`;
        } else {
            const producto = PRODUCTOS[productoId];
            const precio = producto.precio;
            totalSinDescuento = precio * cantidad;
            totalFinal = totalSinDescuento;

            switch (promo) {
                case "2x50":
                    if (cantidad >= 2) {
                        const pares = Math.floor(cantidad / 2);
                        const productosSinPromo = cantidad % 2;
                        const totalConPromo =
                            (pares * (precio + precio * 0.5)) +
                            (productosSinPromo * precio);
                        descuento = totalSinDescuento - totalConPromo;
                        totalFinal = totalConPromo;
                        mensajeExtra.textContent = `Se aplicó la promo a ${pares * 2} unidad(es) de ${producto.nombre}.`;
                    } else {
                        mensajeExtra.textContent = "La promoción 50% en la segunda unidad se aplica a partir de 2 unidades.";
                    }
                    break;

                case "3x2":
                    if (cantidad >= 3) {
                        const gruposDeTres = Math.floor(cantidad / 3);
                        const productosSinPromo = cantidad % 3;
                        const totalConPromo =
                            (gruposDeTres * 2 * precio) +
                            (productosSinPromo * precio);
                        descuento = totalSinDescuento - totalConPromo;
                        totalFinal = totalConPromo;
                        mensajeExtra.textContent = `Tenés ${gruposDeTres} unidad(es) bonificada(s) con la promo 3x2.`;
                    } else {
                        mensajeExtra.textContent = "La promoción 3x2 se aplica comprando al menos 3 unidades.";
                    }
                    break;

                case "10mas30":
                    if (totalSinDescuento > 30000) {
                        descuento = totalSinDescuento * 0.10;
                        totalFinal = totalSinDescuento - descuento;
                        mensajeExtra.textContent = "Se aplicó el 10% de descuento por superar los $30.000.";
                    } else {
                        mensajeExtra.textContent = "Para que se aplique el 10% de descuento, el total debe superar los $30.000.";
                    }
                    break;
            }
        }

        // Actualizar totales de esta operación
        spanTotalSinDesc.textContent = formatearPesos(totalSinDescuento);
        spanDescuento.textContent = formatearPesos(descuento);
        spanTotalFinal.textContent = formatearPesos(totalFinal);

        // Acumular ahorro total de todas las promociones calculadas
        totalAhorradoAcumulado += descuento;
        spanTotalAhorrado.textContent = formatearPesos(totalAhorradoAcumulado);

        // Guardar última operación para poder mandarla al carrito
        ultimaPromo = promo;
        ultimoProductoId = productoId;
        ultimaCantidad = cantidad;
        ultimoTotalFinal = totalFinal;
    });

    // ---- Lógica para agregar la promoción al carrito ----

    function obtenerCarrito() {
        try {
            const data = localStorage.getItem("carritoGreenShot");
            if (!data) return {};
            return JSON.parse(data);
        } catch (e) {
            return {};
        }
    }

    function guardarCarrito(carrito) {
        localStorage.setItem("carritoGreenShot", JSON.stringify(carrito));
    }

    function cantidadTotal(carrito) {
        return Object.values(carrito).reduce((acc, item) => acc + item.cantidad, 0);
    }

    function actualizarBadgeCarrito() {
        const carritoCantidad = document.getElementById("carritoCantidad");
        if (!carritoCantidad) return;
        const carrito = obtenerCarrito();
        carritoCantidad.textContent = cantidadTotal(carrito);
    }

    function agregarPromoAlCarrito(nombreLinea, precioTotal) {
        const carrito = obtenerCarrito();
        const id = "promo_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        carrito[id] = {
            id,
            nombre: nombreLinea,
            precio: Number(precioTotal),
            cantidad: 1
        };
        guardarCarrito(carrito);
        actualizarBadgeCarrito();
    }

    if (btnAgregarPromoCarrito) {
        btnAgregarPromoCarrito.addEventListener("click", function () {
            if (!ultimaPromo || ultimoTotalFinal <= 0) {
                alert("Primero calculá una promoción antes de agregarla al carrito.");
                return;
            }

            let nombreLinea = "";

            if (ultimaPromo === "comboGYP") {
                nombreLinea = `Promo Combo guante + pelotas x${ultimaCantidad}`;
            } else {
                const prod = PRODUCTOS[ultimoProductoId];
                const nombreProd = prod ? prod.nombre : "Producto";
                let etiquetaPromo = "";
                switch (ultimaPromo) {
                    case "2x50":
                        etiquetaPromo = "Promo 50% 2da unidad";
                        break;
                    case "3x2":
                        etiquetaPromo = "Promo 3x2";
                        break;
                    case "10mas30":
                        etiquetaPromo = "Promo 10% +$30.000";
                        break;
                }
                nombreLinea = `${etiquetaPromo} - ${nombreProd} (x${ultimaCantidad})`;
            }

            agregarPromoAlCarrito(nombreLinea, ultimoTotalFinal);
            alert("La promoción se agregó al carrito como un ítem con el precio final de la promo.");
        });
    }
});
