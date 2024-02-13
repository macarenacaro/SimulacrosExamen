"use strict"
//VARIABLES GLOBALES
let idCliente = 0;
let clientes = {};

alert("clienteCreado");
let cli1 = new Cliente("Juan", "Pérez", "12345678A", 30, "1-1-2019", "Premium");
let cli2 = new Cliente("Ana", "García", "87654321B", 25, "2-2-2019", "Normal");
anyadirCliente(cli1);
anyadirCliente(cli2);
muestraWeb();


/*1. (1 punto) Crea la función constructora del tipo de objeto Persona (función constructora objeto Persona)
Sus propiedades son los nombres en minúsculas en negrita:
-nombre, cadena
-apellidos, cadena
-nif, cadena
-edad, número */

function Persona(nombre, apellidos, nif, edad) {
    if (typeof (nombre) === 'string') {
        this.nombre = nombre;
    }

    if (typeof (apellidos) === 'string') {
        this.apellidos = apellidos;
    }

    if (typeof (nif) === 'string') {
        this.nif = nif;
    }

    if (typeof (edad) === 'number') {
        this.edad = edad;
    }
}


/*2. (1 punto) Crear otro tipo de objeto (función constructora Cliente),
que hereda todo del objeto Persona (prototipos) añadiendo las propiedades:
-fechaAlta, almacena un timestamp (número). 
 A la función constructora se le pasa un string que 
 se debe convertir con date.parse a timestamp
-tipoCliente, string
 */

function Cliente(nombre, apellidos, nif, edad,fechaAlta, tipoCliente) {

    this.__proto__= new Persona(nombre, apellidos, nif, edad); //creamos prototipo apartir de persona
    
    //CONDICION PARA FECHA
    if (typeof (fechaAlta) === 'string' && Date.parse(fechaAlta)) { //si es string y lee formato fecha   
        this.fechaAlta = Date.parse(fechaAlta);
    } else {
        this.fechaAlta = Date.now();
    }

    //CONDICION PARA TIPO CLIENTE
    if (typeof (tipoCliente) === 'string') {
        this.tipoCliente = tipoCliente;
    }
}

/*2. (1 punto) Crear la función anyadirCliente() 
de un sólo parámetro que insertará en un array global de clientes 
el cliente en cuestión anyadiéndole una propiedad id.
id se corresponderá con una variable global llamada idCliente.
 */

function anyadirCliente(cliente) {
    cliente.id = idCliente;
    clientes.push(cliente);
    idCliente++;
}

/*3. (1 punto) Función muestraWeb():
Mostrará un título h1 centrado con el texto "Listado de  Clientes" que cuelga del div con id de la página "listado"
Una lista ordenada para todos los clientes, y un li para cada uno de ellos
Dentro del li habrá un div del que colgarán todas las propiedades en elementos p.*/

function muestraWeb() {
    alert("hff")
    let divListado = document.getElementById("listado");

    let h1 = document.createElement('h1'); // Crear elemento 
    h1.innerHTML = "";
    h1.innerHTML = "Listado de Clientes";
    divListado.appendChild(h1); //insertar en listado

    let ol = document.createElement('ol'); // ol
    ol.id = "listaOrdenada";
    divListado.appendChild(ol); //insertar en listado
}

/*4. (1 punto) Función muestraCliente. Con un parámetro que es el cliente a mostrar. 
Dentro de ella se puede crear la estructura de cada li, y cada div y los p asociados a un cliente.
Además de los botones Editar y Borrar.*/

function muestraCliente() {
    let divOl = document.getElementById("listaOrdenada");

    for (let cli of clientes) { //recorremos los clientes y creamos li de c/u
        let liCliente = document.createElement('li'); // li
        let divCliente = document.createElement('div'); // li - div

        let pNom = document.createElement('p'); // li <- div <- p
        pNom.innerHTML = cli.nombre;
        divCliente.appendChild(pNom);

        let pApe = document.createElement('p');
        pApe.innerHTML = cli.apellidos;
        divCliente.appendChild(pApe);

        let pNif = document.createElement('p');
        pNif.innerHTML = cli.nif;
        divCliente.appendChild(pNif);

        let pEdad = document.createElement('p');
        pEdad.innerHTML = cli.edad;
        divCliente.appendChild(pEdad);

        let pfecha = document.createElement('p');
        pfecha.innerHTML = cli.fechaAlta;
        divCliente.appendChild(pfecha);

        let ptipo = document.createElement('p');
        ptipo.innerHTML = cli.tipoCliente;
        divCliente.appendChild(ptipo);


        //******************* BOTON EDITAR DENTRO DE FORM ******************* 
        let btnEditar = document.createElement("button");
        btnEditar.id = `bEdi${cli.id}`; //AÑADIMOS ID A BOTONES EJ: “bEdit1”????????
        btnEditar.textContent = "Editar";
        //******************* ASOCIAR EVENTO A BOTON *****************
        let editarHandler = new EditarHandleFormulario();
        btnEditar.addEventListener("click", editarHandler); // 3.5 Añadir evento al botón 
        divCliente.appendChild(btnEditar);


        //********************  BOTON BORRAR DENTRO DE FORM ******************* 
        let btnBorrar = document.createElement("button");
        btnBorrar.id = `bDel${cli.id}`; //AÑADIMOS ID A BOTONES EJ: “bBorrar1”????????
        btnBorrar.textContent = "Borrar";
        //******************* ASOCIAR EVENTO A BOTON *****************
        let borrarHandler = new BorrarHandle();
        btnBorrar.addEventListener("click", borrarHandler);
        divCliente.appendChild(btnBorrar);


        liCliente.appendChild(divCliente) // li <- div
    }
}


/*  5. (2 puntos) Función EditarHandleFormulario(),  función manejadora que se asociará a cada botón 
de edición de los clientes.  Serán funciones constructoras de un objeto manejador de eventos
*/

function EditarHandleFormulario() {
    this.handleEvent = function (event) {
        let ide = event.currentTarget.id.slice(5); //obtenemos el id a partid del boton: E J: “bEdit1”
        let cli = clientes.find(cli => cli.id == ide); //buscar al cliente con ese ide


        //1.Crear una copia e insertar formulario web definido en la plantilla HTML
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

        //2.Acceder al elemento <form> dentro de ese fragmento de documento.
        var formulario = plantillaFormulario.querySelector("form");
        let div = document.getElementById("controlesprincipales"); //Añade Form
        div.append(formulario);

        //3.SELECCIONAMOS EL BOTÓN ACTUAL Y BLOQUEAMOS EDITAR, AÑADIR Y BORRAR
        let btEditform = event.currentTarget;
        btEditform.after(formulario); // Inserta el formulario después del botón que activó el evento.
        btEditform.disabled = true; // Desactiva el botón ACTUAL (EditarFormulario) (no se repite)
        let botonAnyadir = document.getElementById("anyadeCliForm"); //seleccionamos btn anyadir
        botonAnyadir.disabled = true; //desactivamos

        //4. escribir en el formulario los datos del empleado 
        formulario.elements.nombre.value = cli.nombre;
        formulario.elements.apellidos.value = cli.apellidos;
        formulario.elements.nif.value = cli.nif;
        formulario.elements.edad.value = cli.edad;
        formulario.elements.fecAlta.value = cli.fechaAlta;
        formulario.elements.tipCli.value = cli.tipoCliente;

        /*EVENTO PARA BOTON SUBMIT (ENVIAR),con función directa, sin crear EditSubmit*/
        formulario.addEventListener("submit", function (event) {
            event.preventDefault(); //evito que se reinicie por completo
            cli.nombre = formulario.elements.nombre.value; //guardamos los valores que estan en textbox
            cli.apellidos = formulario.elements.apellidos.value;
            cli.nif = formulario.elements.nif.value;
            cli.edad = formulario.elements.edad.value;
            cli.fechaAlta = formulario.elements.fecAlta.value;
            cli.tipoCliente = formulario.elements.tipCli.value;
            botonAnyadir.disabled = false; //activamos añadir empleado
            muestraWeb(); //actua como repintar
        });

        /*EVENTO PARA BOTON CANCELAR,con función directa, sin crear CANCELHANDLE*/
        let bt_cancelar = formulario.querySelector("button.cancelar");
        bt_cancelar.addEventListener("click", function () {
            botonAnyadir.disabled = false; //activamos añadir empleado
            muestraWeb();
        });
    }
}


/*7.(1 punto) Función anyademe:
 (1Función no constructora asociada al botón del html con id anyadeCli, que insertará un cliente mediante prompts. */

 function anyademe(){
    let nombre = prompt("Introduce Nombre:");
    let apellido = prompt("Introduce apellidos");
    let nif = prompt("Introduce nif");
    let edad = prompt("Introduce edad"); 
    edad = Number(edad);//lo transfomamos a número.

    let fecha = prompt("Introduce fecha"); 
    fecha = Date.parse(fecha);

    let tipo = prompt("Introduce tipo"); 

    let clienteNuevo = new Cliente(nombre, apellidos, nif, edad,fecha,tipo);
    anyadirCliente(clienteNuevo);
    muestraWeb();
 }

/*ASOCIAR BOTON A anyademe */
//******************* ASOCIAR EVENTO A BOTÓN *****************
let boton_anyadirCli = document.getElementById("anyadeCli");
boton_anyadirCli.addEventListener("click", anyademe); //opcion2 para crearle f(x) al boton






/*6. (1 punto) Función BorrarHandleFormulario(), función manejadora que se asociará a 
cada botón de borrar de los clientes. Serán funciones constructoras de un objeto manejador de eventos
*/

/*Las funciones 5 y 6  deben llevar asociadas otras que manejen un submit del formulario y un cancel.
El formulario está como template en el html.
 */