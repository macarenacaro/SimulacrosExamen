"use strict";

// Variables globales
let idEmpleado = 0;
let empleados = [];
//Para comprobar que la aplicación funciona ahora tenemos que crear empleados, meterlos en el array y mostrar la parte web:
let emple1 = new Empleado("Juan", "Pérez", "12345678A", 30, "Programador", 2000, 5);
let emple2 = new Empleado("Ana", "García", "87654321B", 25, "Programador", 2000, 2);
anyadirEmpleado(emple1);
anyadirEmpleado(emple2);
muestraWeb();

//PRIMERA PARTE (0,5 PUNTOS)
// Constructor de objeto Empleado
function Empleado(nombre, apellidos, nif, edad, puesto, salario, antigüedad) {
  this.nombre = nombre;
  this.apellidos = apellidos;
  this.nif = nif;
  this.edad = edad;
  this.puesto = puesto;
  this.salario = salario;
  this.antigüedad = antigüedad;
}

//2. Crea la función anyadirEmpleado:
function anyadirEmpleado(empleado) {
  empleado.id = idEmpleado; //añadir id
  empleados.push(empleado); //agregar al array
  idEmpleado++; //aumento empleado
}

//SEGUNDA PARTE (2 PUNTOS)
// PUEDE USARSE A MODO DE REPINTAR
function muestraWeb() {
  /*·insertará un encabezado h1 con id tituloH1 con la frase "Listado de Empleados"*/
  let divEmple = document.getElementById("divEmple"); //seleccionamos div
  divEmple.innerHTML = ""; // Eliminar el contenido anterior antes de agregar el encabezado

  let h1 = document.createElement("h1");
  h1.id = "tituloH1"; //creamos propiedad id
  h1.innerHTML = "Listado de Empleados";
  divEmple.appendChild(h1); //insertamos

  /*·creará una lista ordenada con el id listaOrd y con la clase "rounded-list" */
  let listaOrdenada = document.createElement("ol");
  listaOrdenada.id = "listaOrd";
  listaOrdenada.className = "rounded-list";
  divEmple.appendChild(listaOrdenada); //insertamos lista

  /*
  if (divEmple.classList.contains("rounded-list")) { //si existe
    divEmple.removeChild(listaOrdenada);
    divEmple.appendChild(listaOrdenada); //insertamos lista
  } else {
    divEmple.appendChild(listaOrdenada); //insertamos lista
  }
*/
  //·Bucle muestraEmpleado a la que se le pasará un empleado como argumento 
  for (let empleado of empleados) {
    muestraEmpleado(empleado);
  }
}


/*TERCERA PARTE, TOTAL (6 PUNTOS)
 Con un único parámetro que será un objeto empleado*/
function muestraEmpleado(empleado) {
  //·Se obtendrá el id de la lista ordenada para "colgarle" un li al que le pondrás como id, el "li" concatenado con el id del empleado. (li0, li1…)
  let listaOrdenada = document.getElementById("listaOrd"); //obtenemos 
  let lista = document.createElement("li");
  lista.id = "li" + empleado.id;

  //·Del li del empleado colgará un div que tienes que crear, con la clase "empleado" y con el id del empleado. 
  let divLista = document.createElement("div");
  divLista.className = "empleado";
  divLista.id = empleado.id;

  /*Dentro de ese div se crearán elementos p para ir poniendo:
  · Nombre Apellidos
  · El resto de propiedades de una en una en cada p.
  ·El div colgará del li. Para que se entienda esta es la estructura:*/
  let pNombre = document.createElement("p");
  pNombre.textContent = `Nombre: ${empleado.nombre} ${empleado.apellidos}`;

  let pNIF = document.createElement("p");
  pNIF.textContent = `NIF: ${empleado.nif}`;

  let pEdad = document.createElement("p");
  pEdad.textContent = `Edad: ${empleado.edad}`;

  let pPuesto = document.createElement("p");
  pPuesto.textContent = `Puesto: ${empleado.puesto}`;

  let pSalario = document.createElement("p");
  pSalario.textContent = `Salario: ${empleado.salario}`;

  let pAntigüedad = document.createElement("p");
  pAntigüedad.textContent = `Antigüedad: ${empleado.antigüedad}`;

  //*****BOTON EDITAR DENTRO DE FORM
  let btnEditar = document.createElement("button");
  btnEditar.id = `bEdit${empleado.id}`;
  btnEditar.textContent = "Editar";

  /*AGREGAR AddEvent, de esta manera SI O SI */
  let editarHandler = new EditarHandleFormulario();
  btnEditar.addEventListener("click", editarHandler); // 3.5 Añadir evento al botón 

  //*****BOTON BORRAR DENTRO DE FORM
  let btnBorrar = document.createElement("button");
  btnBorrar.id = `bBorrar${empleado.id}`;
  btnBorrar.textContent = "Borrar";

  // Añadir evento al botón  
  let borrarHandler = new BorrarHandle();
  btnBorrar.addEventListener("click", borrarHandler);


  /* añadimos a lista los <p> */
  divLista.appendChild(pNombre);
  divLista.appendChild(pNIF);
  divLista.appendChild(pEdad);
  divLista.appendChild(pPuesto);
  divLista.appendChild(pSalario);
  divLista.appendChild(pAntigüedad);
  divLista.appendChild(btnEditar);
  divLista.appendChild(btnBorrar);

  lista.appendChild(divLista);
  listaOrdenada.appendChild(lista); //a la lista general Ordenada , le añadimos lista
}

//*MANEJADORES
/*Se debe tener en cuenta la desactivación de botones cuando se esté editando o creando un nuevo empleado con formulario. */
function EditarHandleFormulario() {
  this.handleEvent = function (event) {
    //0.Encontrar id
    let ide = event.currentTarget.id.slice(5); //obtenemos el id a partid del boton
    let emple = empleados.find(emp => emp.id == ide); //buscar al empleado con ese ide

    //1.Crear una copia del formulario web definido en la plantilla HTML
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    //2.Acceder al elemento <form> dentro de ese fragmento de documento.
    var formulario = plantillaFormulario.querySelector("form");
    let div = document.getElementById("controlesprincipales"); //Añade Form
    div.append(formulario);

    //3.SELECCIONAMOS EL BOTÓN ACTUAL Y BLOQUEAMOS EDITAR, AÑADIR Y BORRAR
    let btEditform = event.currentTarget;
    btEditform.after(formulario); // Inserta el formulario después del botón que activó el evento.
    btEditform.disabled = true; // Desactiva el botón ACTUAL SELECCIONADO (EditarFormulario)
    let botonAnyadir = document.getElementById("anyadeEmpleForm");
    botonAnyadir.disabled = true;

    //4. escribir en el formulario los datos del empleado 
    formulario.elements.nombre.value = emple.nombre;
    formulario.elements.apellidos.value = emple.apellidos;
    formulario.elements.nif.value = emple.nif;
    formulario.elements.edad.value = emple.edad;
    formulario.elements.puesto.value = emple.puesto;
    formulario.elements.salario.value = emple.salario;
    formulario.elements.antigüedad.value = emple.antigüedad;


    /*Para actualizarlo, directamente, sin crear EditSubmit*/
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();
      emple.nombre = formulario.elements.nombre.value;
      emple.apellidos = formulario.elements.apellidos.value;
      emple.nif = formulario.elements.nif.value;
      emple.edad = formulario.elements.edad.value;
      emple.puesto = formulario.elements.puesto.value;
      emple.salario = formulario.elements.salario.value;
      emple.antigüedad = formulario.elements.antigüedad.value;

      botonAnyadir.disabled = false; //activamos añadir empleado
      muestraWeb();
    });



    let bt_cancelar = formulario.querySelector("button.cancelar");
    bt_cancelar.addEventListener("click", function () {
      botonAnyadir.disabled = false; //activamos añadir empleado
      muestraWeb();
    });
  }
}

//·El html tiene un <template> de formulario que se usará para la edición
function BorrarHandle() {
  this.handleEvent = function (event) {
    let ide = event.currentTarget.id.slice(7); // Obtiene el ID del empleado desde el ID del botón
    empleados = empleados.filter(emp => emp.id != ide);
    muestraWeb();
  }
}



//CUARTA PARTE (1'5 PUNTOS)
//·Se le asignará el evento necesario al click del botón del html con id:  anyadeEmpleForm (en el div con id 'controlesprincipales')
let botonAnyadir = document.getElementById("anyadeEmpleForm");
let nuevoEmp = new nuevoEmpleadoWebFormulario(); //ASÍ SE LLAMA A LA FUNCION CUANDO ES HANDLE EVENT!!
botonAnyadir.addEventListener("click", nuevoEmp); // 3.5 Añadir evento al botón 

//********** Función para manejar la creación de un nuevo empleado por formulario  **********
function nuevoEmpleadoWebFormulario() {
  this.handleEvent = function (event) {
    //1. Obtener form
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
   
    //2. insertamos form
    let divCont = document.getElementById("controlesprincipales");
    divCont.append(formulario);

    //3.Bloquear btn añadir (para que no se multiplique)
     let btAnyadir = event.currentTarget;
     btAnyadir.after(formulario); // Inserta el formulario después del botón que activó el evento.
     btAnyadir.disabled = true; // Desactiva el botón ACTUAL SELECCIONADO (EditarFormulario)
     

    /*BOTON PARA ACTUALIZAR*/
    formulario.addEventListener("submit", function (event) {
      event.preventDefault(); //evita que se reinicie la pagina de 0!
      //3.Nuevo empleado lo asociamos a los textbox 
      let empleadoNuevo = new Empleado(formulario.elements.nombre.value,
        formulario.elements.apellidos.value,
        formulario.elements.nif.value,
        formulario.elements.edad.value,
        formulario.elements.puesto.value,
        formulario.elements.salario.value,
        formulario.elements.antigüedad.value);
      anyadirEmpleado(empleadoNuevo);
      muestraWeb();
      btAnyadir.disabled = false;
    }); //envia el form al objeto EditSubmit

    /*BOTON PARA CANCELAR*/
    let bt_cancelar = formulario.querySelector("button.cancelar");
    bt_cancelar.addEventListener("click", function (event) { //addEventListener junto con un objeto manejador de evento
      event.currentTarget.parentNode.remove(); //se elimina el formulario!
      btAnyadir.disabled = false;
      muestraWeb();
    });

  }
}
