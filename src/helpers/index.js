export const calcularUtilidad = (pv,cvu,cf,cantidadEvento,cantidadAlternativa)=>{
    
    return (cantidadEvento>cantidadAlternativa) 
            ? 
            Number((pv*cantidadAlternativa-cvu*cantidadAlternativa-cf).toFixed(2))
            :
            Number((pv*cantidadEvento-cvu*cantidadAlternativa-cf).toFixed(2))
    
    
}

export const calcularTabla = (pv,cvu,cf,eventos, alternativas, probabilidades)=>{
    //console.log({pv,cvu,cf,eventos, alternativas});
    let tabla = [];

    alternativas.forEach((alternativa)=>{
        let fila = []
        eventos.forEach((evento)=>{
            const utilidad = calcularUtilidad(pv, cvu, cf, Number(evento), Number(alternativa))
            fila = [...fila, utilidad]
        })
        tabla = [...tabla, fila]
    }
    )
    return tabla;
}

/*

    [
     [],
     [],
     [],
    ]

*/ 

export const calcularVME = (tabla, probabilidades) => {
  console.log(tabla);
  console.log(probabilidades);
    return tabla.map((filaUtilidad) => {
      const vmeFila = filaUtilidad.reduce(
        (acum, utilidad, ia) => acum + Number(utilidad) * Number(probabilidades[ia]),
        0
      );
      return vmeFila;
    });
  };


  export const encontrarPosicionDelMaximo = (lista)=> {
    if (lista.length === 0) {
      // Si la lista está vacía, retornamos null o -1 dependiendo de tus necesidades.
      return null; // O puedes devolver -1 si prefieres.
    }
  
    let maximo = lista[0]; // Suponemos que el primer elemento es el máximo inicialmente.
    let posicionMaximo = 0; // La posición del máximo hasta ahora es 0.
  
    for (let i = 1; i < lista.length; i++) {
      if (lista[i] > maximo) {
        // Si encontramos un valor mayor, actualizamos el máximo y la posición.
        maximo = lista[i];
        posicionMaximo = i;
      }
    }
  
    return posicionMaximo;
  }