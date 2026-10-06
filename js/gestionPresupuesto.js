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

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (typeof valor === 'number' && valor > 0) ? valor : 0;

    let timestampParsed = Date.parse(fecha);
    if (isNaN(timestampParsed)) {
        this.fecha = Date.now();
    } else {
        this.fecha = timestampParsed;
    }

    this.etiquetas = [];

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

    this.mostrarGastoCompleto = function() {
        let fechaFormateada = new Date(this.fecha).toLocaleString();
        let resultado = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        resultado += `Fecha: ${fechaFormateada}\n`;
        resultado += `Etiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
            resultado += `- ${etiqueta}\n`;
        }

        return resultado;
    };

    this.actualizarFecha = function(nuevaFecha) {
        let timestampParsed = Date.parse(nuevaFecha);
        if (!isNaN(timestampParsed)) {
            this.fecha = timestampParsed;
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(
            (etiqueta) => !etiquetasABorrar.includes(etiqueta)
        );
    };

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }
}

let gastos = [];
let idGasto = 0;

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let indice = gastos.findIndex((gasto) => gasto.id === id);
    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}

export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto
}