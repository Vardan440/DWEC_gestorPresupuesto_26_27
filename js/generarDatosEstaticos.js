import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';


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