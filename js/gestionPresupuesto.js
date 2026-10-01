// Variable global
let presupuesto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (typeof nuevoPresupuesto !== 'number' || nuevoPresupuesto < 0 || Number.isNaN(nuevoPresupuesto)) {
        return -1;
    }
    presupuesto = nuevoPresupuesto;
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Función constructora para crear el objeto gasto
function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = (typeof valor === 'number' && valor > 0) ? valor : 0;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor > 0) {
            this.valor = nuevoValor;
        }
    };
}

// NO MODIFICAR A PARTIR DE AQUÍ
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}