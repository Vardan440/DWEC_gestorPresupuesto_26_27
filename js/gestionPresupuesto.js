"use strict";

// ==========================================
// FUNDAMENTOS 1: GESTIÓN DEL PRESUPUESTO
// ==========================================

let presupuesto = 0;

// Función para actualizar el presupuesto global
function actualizarPresupuesto(nuevoPresupuesto) {
    // Valida que sea un número real, finito, no NaN y mayor o igual a 0
    if (typeof nuevoPresupuesto !== 'number' || nuevoPresupuesto < 0 || Number.isNaN(nuevoPresupuesto)) {
        return -1; // Código de error si el valor no es válido
    }
    presupuesto = nuevoPresupuesto;
    return presupuesto;
}

// Función para mostrar el presupuesto actual en formato texto
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// ==========================================
// FUNCIÓN CONSTRUCTORA: CrearGasto
// ==========================================
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    // Valida el valor: si es un número positivo lo asigna, de lo contrario pone 0
    this.valor = (typeof valor === 'number' && valor > 0) ? valor : 0;

    // Procesamiento de fecha: intenta parsearla, si falla usa la fecha actual (Date.now())
    let timestampParsed = Date.parse(fecha);
    if (isNaN(timestampParsed)) {
        this.fecha = Date.now();
    } else {
        this.fecha = timestampParsed;
    }

    this.etiquetas = [];

    // Método para mostrar información básica del gasto
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    // Método para modificar la descripción
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    // Método para modificar el valor con validación previa
    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor > 0) {
            this.valor = nuevoValor;
        }
    };

    // ==========================================
    // FUNDAMENTOS 2: MÉTODOS AVANZADOS DEL GASTO
    // ==========================================
    
    // Muestra el detalle completo incluyendo fecha formateada y lista de etiquetas con saltos de línea
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

    // Actualiza la fecha del gasto si el formato es válido
    this.actualizarFecha = function(nuevaFecha) {
        let timestampParsed = Date.parse(nuevaFecha);
        if (!isNaN(timestampParsed)) {
            this.fecha = timestampParsed;
        }
    };

    // Añade etiquetas nuevas evitando duplicados usando .includes()
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    // Borra etiquetas específicas usando .filter()
    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(
            (etiqueta) => !etiquetasABorrar.includes(etiqueta)
        );
    };

    // Si se pasaron etiquetas en el constructor, las añade de inmediato
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    // Devuelve el periodo formateado ("YYYY-MM-DD", "YYYY", o "YYYY-MM") para las agrupaciones
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

// ==========================================
// GESTIÓN DE LA LISTA GLOBAL DE GASTOS
// ==========================================

let gastos = [];
let idGasto = 0;

// Devuelve el array completo de gastos
function listarGastos() {
    return gastos;
}

// Asigna un ID autoincremental al gasto y lo añade al array
function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

// Elimina un gasto del array buscando por su ID (utiliza findIndex y splice)
function borrarGasto(id) {
    let indice = gastos.findIndex((gasto) => gasto.id === id);
    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}

// Calcula el valor acumulado de todos los gastos usando .reduce()
function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

// Resta el total de gastos al presupuesto actual para obtener el balance restante
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

// ==========================================
// FILTRADO Y AGRUPACIÓN AVANZADA
// ==========================================

// Filtra los gastos según múltiples criterios opcionales enviados en un objeto (fechas, importes, texto, etiquetas)
function filtrarGastos(filtros = {}) {
    return gastos.filter(gasto => {
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
        
        // Búsqueda por coincidencia de texto en la descripción (insensible a mayúsculas/minúsculas)
        if (filtros.descripcionContiene) {
            const desc = gasto.descripcion.toLowerCase();
            const busca = filtros.descripcionContiene.toLowerCase();
            if (!desc.includes(busca)) {
                return false;
            }
        }

        // Filtra si el gasto contiene alguna de las etiquetas especificadas
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

// Agrupa los gastos por un período de tiempo (mes, año o día) sumando sus valores mediante .reduce()
function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde = null, fechaHasta = null) {
    const filtros = {};

    if (fechaDesde) {
        filtros.fechaDesde = fechaDesde;
    }

    if (fechaHasta) {
        filtros.fechaHasta = fechaHasta;
    } else {
        // Por defecto, limita la fecha hasta el día actual
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        filtros.fechaHasta = `${anio}-${mes}-${dia}`;
    }

    if (etiquetas && etiquetas.length > 0) {
        filtros.etiquetasTiene = etiquetas;
    }

    const gastosFiltrados = filtrarGastos(filtros);

    return gastosFiltrados.reduce((acc, gasto) => {
        const clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[clavePeriodo] = (acc[clavePeriodo] || 0) + gasto.valor;
        return acc;
    }, {});
}

// ==========================================
// EXPORTACIÓN DE MÓDULOS
// ==========================================
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
};