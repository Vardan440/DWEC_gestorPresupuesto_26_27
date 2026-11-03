function mostrarDatoEnId(idElemento, valor) {

    document.getElementById(idElemento).textContent=valor


}

function mostrarGastoWeb(idElemento, gasto){

    let DivGasto=document.createElement('div')
    DivGasto.className = "gasto";

    let gastoDescripcion=document.createElement('div')
    gastoDescripcion.className = "gasto-descripcion";

    let gastoFecha=document.createElement('div')
    gastoFecha.className = "gasto-fecha";

    let gastoValor=document.createElement('div')
    gastoValor.className = "gasto-valor";

    let gastoEtiquetas=document.createElement('div')
    gastoEtiquetas.className = "gasto-etiquetas"; 
    
    document.getElementById(idElemento).append(DivGasto);
    DivGasto.append(gastoDescripcion);
    DivGasto.append(gastoFecha);
    DivGasto.append(gastoValor);
    DivGasto.append(gastoEtiquetas);

    for  (let i=0;i<gasto.etiquetas.length;i++)
    {
        let etiqueta = document.createElement('span');
        etiqueta.textContent=gasto.etiquetas[i];
        etiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiquetas.append(etiqueta);
    }
}

export {

    mostrarDatoEnId,
    mostrarGastoWeb

    
}