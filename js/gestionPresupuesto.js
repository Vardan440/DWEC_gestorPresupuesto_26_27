// Fundamentos 1

let presupuesto = 0;

// Función para actualizar el presupuesto
function actualizarPresupuesto(nuevoPresupuesto) {
    if (typeof nuevoPresupuesto !== 'number' || nuevoPresupuesto < 0 || Number.isNaN(nuevoPresupuesto)) {
        return -1;
    }
    presupuesto = nuevoPresupuesto;
    return presupuesto;
}

// Función para mostrar el presupuesto actual
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Función constructora para crear objetos gasto
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

    // Método para mostrar el gasto
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    // Método para actualizar la descripción
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    // Método para actualizar el valor
    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor > 0) {
            this.valor = nuevoValor;
        }
    };



    
//FUNDAMENTOS 2
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
    this.obtenerPeriodoAgrupacion = function(periodo = "mes") {
        const fechaObj = new Date(this.fecha);
        const anio = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaObj.getDate()).padStart(2, '0');

        if (periodo === "dia") {
            return `${anio}-${mes}-${dia}`;
        } else if (periodo === "anyo") {
            return `${anio}`;
        }
        return `${anio}-${mes}`;
    };
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

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros = {}) {
    return gastos.filter(gasto => {
        // gasto.fecha ya es un timestamp numérico
        const fechaGasto = gasto.fecha;

        if (filtros.fechaDesde && fechaGasto < Date.parse(filtros.fechaDesde)) {
            return false;
        }
        if (filtros.fechaHasta && fechaGasto > Date.parse(filtros.fechaHasta)) {
            return false;
        }
        if (filtros.valorMinimo !== undefined && gasto.valor < filtros.valorMinimo) {
            return false;
        }
        if (filtros.valorMaximo !== undefined && gasto.valor > filtros.valorMaximo) {
            return false;
        }
        
        if (filtros.descripcionContiene) {
            const desc = gasto.descripcion.toLowerCase();
            const busca = filtros.descripcionContiene.toLowerCase();
            if (!desc.includes(busca)) {
                return false;
            }
        }

        if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
            const tieneEtiqueta = filtros.etiquetasTiene.some(etq => 
                gasto.etiquetas.map(e => e.toLowerCase()).includes(etq.toLowerCase())
            );
            if (!tieneEtiqueta) {
                return false;
            }
        }

        return true;
    });
}

export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}