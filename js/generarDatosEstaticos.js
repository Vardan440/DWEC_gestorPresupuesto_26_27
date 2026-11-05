import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// npx cypress open 
gestionPresupuesto.actualizarPresupuesto(1500)

gestionPresupuestoWeb.mostrarDatoEnId(
    "presupuesto",

gestionPresupuesto.mostrarPresupuesto()
);
// Crear los gastos
const gasto1 = new gestionPresupuesto.CrearGasto(
    "Compra carne", 23.44, "2021-10-06", "casa", "comida"
);

const gasto2 = new gestionPresupuesto.CrearGasto(
    "Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"
);

const gasto3 = new gestionPresupuesto.CrearGasto(
    "Bonobús", 18.60, "2020-05-26", "transporte"
);

const gasto4 = new gestionPresupuesto.CrearGasto(
    "Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"
);

const gasto5 = new gestionPresupuesto.CrearGasto(
    "Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"
);

const gasto6 = new gestionPresupuesto.CrearGasto(
    "Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"
);

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto1);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto2);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto3);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto4);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto5);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto6);

gestionPresupuestoWeb.mostrarDatoEnId(
    "gastos-totales",
    gestionPresupuesto.calcularTotalGastos()
);

gestionPresupuestoWeb.mostrarDatoEnId(
    "balance-total",
    gestionPresupuesto.calcularBalance()
);

//-----------------------------------

// Filtrado 1: gastos de septiembre de 2021
let filtrados1 = gestionPresupuesto.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});
for (const gasto of filtrados1) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

// Filtrado 2: gastos de más de 50 €
let filtrados2 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 50
});
for (const gasto of filtrados2) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

// Filtrado 3: gastos de más de 200 € con etiqueta "seguros"
let filtrados3 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
});
for (const gasto of filtrados3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

// Filtrado 4: gastos de menos de 50 € con etiqueta "comida" o "transporte"
let filtrados4 = gestionPresupuesto.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ["comida", "transporte"]
});
for (const gasto of filtrados4) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

// Agrupaciones
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-dia",
    gestionPresupuesto.agruparGastos("dia"),
    "dia"
);

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-mes",
    gestionPresupuesto.agruparGastos("mes"),
    "mes"
);

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-anyo",
    gestionPresupuesto.agruparGastos("anyo"),
    "anyo"
);