/**
 *  const inputNacimiento= document.querySelector("#birth");
    //blur es el evento de que quitemos ya el cursor del input,
    //es decir cuando salgamos
    inputNacimiento.addEventListener("blur",(evento)=>{    
        capturarFecha(inputNacimiento);
    });
 */
//para el registro de fecha.
//que sea mayor de 18 años
//lo primero sera seleccionar el input de la fecha es decir type=date

//para poder usar el codigo y reutilizarlo en algun otro input
//y no estar haciendo un evenListener para cada uno, mejoraremos el 
//códgigo con los data atributes
//ESTA FUNCION SIEMPRE SE LLAMA CADA VEZ QUE EL USUARIO SALGA DEL 
//INPUT QUE ESTA LLENANDO ("blur");
export function valida(entrada) {
    //entrada=el parametro que estamos recibiendo del app.js
    //dataset que va a revisar que tipo de input es
    //.tipo es el nombre que le dimos despues del data en el html
    //en este caso en el html esta como data-tipo
    //ese "-tipo" es lo que cambia al final, podemos ponerle como querramos
    const tipoInput = entrada.dataset.tipo;

    //debemos de verificar los data-tipos="" que existen en el html
    if (validadores[tipoInput]) { //si existe ese tipo de input en los declarados
        //de validadores
        validadores[tipoInput](entrada); //se lo pasamos como valor
        //es decir el parametro que recibe
    }
    //debemos ver que elemento esta capturando
    //sin embargo para este caso en especifico
    //y para poner ese diseño de borde rojo y el mensaje
    //de que esta mal el campo no es en el input, si no en el div
    //que lo contiene y para eso como ese div es su "padre"
    //necesitamos agregar el .parentElement
    //console.log(entrada.parentElement);
    //para el mensaje de validcacion
    //lo que regresa el validity.valid es si es valido el campo o no
    //si es valido que le quite la clase definida de css que 
    //se definio, si no es valido que la ponga
    if (!entrada.validity.valid) {
        //en caso de que no sea vaido el campo se le agregara la clase para que 
        //se pinte de rojo
        entrada.parentElement.classList.add("input-container--invalid");
        //y debemos de mostrar el error que le corresponda esto se lograra
        //con el uso de una función que será definida abajo pasandole como parametro
        //el tipo de input que se definio y la entrada que recibio la funcion
        entrada.parentElement.querySelector(".input-message-error").innerHTML =
            mostrarMensajeDeError(tipoInput, entrada);

    } else {
        //y si si es valido pero antes ya se le había agregado ese diseño
        //que se quite la clase.        
        entrada.parentElement.classList.remove("input-container--invalid");
        //así tambien si ya se había agreagdo el mensaje de error en el span del html
        //debemos quitarselo, ese span tiene ya una clase en el html llamada
        //input-message-error
        //entonces lo seleccionaremos
        entrada.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
}

//este es necesario ya que pueden existir los errores de typeMismatch, de
//patternMismatch, customError et.
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

/**
 * Ahora para los mensajes de errores que 
 * vayan sucendiendo, como por ejemplo el 
 * de la contraseña o el del email
 * Si los dejamos así por defecto
 * todos diran "este campo no es valido"
 * pero necesitamos especiicar mas cosas y para
 * lograr esto haremos lo sig 
 */

//crearemos un objeto para errores
const mensajesDeError = {
    //estos nombres que se escriban en este objeto
    //deberan de coincidir con los data-type del html
    //es decir en el html tenemos como este:
    //data-tipo="nombre" ese "nombre" es lo que debe de estar aqui
    nombre: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
    },
    email: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
        //el typeMismatch es para correos
        typeMismatch: "El correo igresado no es válido",
    },
    password: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
        //como para la contraseña pusimos un patron que se debe 
        //respetar es decir, letras y numeros etc.
        patternMismatch: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un carácter especial.",
    },
    nacimiento: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
        //y ahora el customError es para cuando se hizo una funcion
        //en este caso es el mismo que se puso al metodo de cuando
        //se valida si es correcta la fecha ingresada.(mayor a 18 años)
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Solo debes ingresar números y deben ser 10"
    },
    direccion: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres"
    },
    ciudad: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 5 y 40 caracteres"
    },
    estado: {
        //el value missing es si el mensaje no se ingreso
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 5 y 40 caracteres"
    }
}

//requiere dos parametros, un tipo de input definido(es decir con el data.set), 
//y un input para validar
function mostrarMensajeDeError(tipoDeInput, input) {
    //tendremos un mensaje que querramos decir
    let mensaje = "";
    //ese mensaje será llenado con el mensaje que le corresponde, esto accediendo 
    //al objeto mensajesDeError, esto será primero
    //recorriendo el tipo de error que definimos, es decir, del arredlo de tpo de
    //errores
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            //para ver si el tipo de error capturaedo esta dentro del arreglo            
            //es decir el validity con el error del arreglo
            //si coincidio que muestre con el console log cual fue
            console.log(error);
            //ahora hasta este punto ya sabemos que error de os declarados
            //se esta presentando, lo que sigue es acceder al objeto de 
            //mensajesDeError[entrando primero al tipo de input determinado]
            //[y despues al error para traer  su texto]
            //console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}


//un objeto 
//esa palabra "nacimiento" viene del html que es el data atribute
//data-tipo= "nacimiento"---> es decir esta
const validadores = {
    //en este caso para lo de nacimiento invocara al metodo de captura
    //fecha que desencadena todo para verificar lo de la edad es decir las dos funciones
    nacimiento: (input) => capturarFecha(input),
};


function capturarFecha(fechaInput) {
    const fechaValue = fechaInput.value;//en ocaciones
    //la fecha asi capturada tiene una dierencia de 1 día
    //es por eso que es importante verificar con el console.log
    //que fecha esta siendo mostrada
    //console.log(fechaObtenida); si tiene diferencia de 1 día
    //se hace lo siguiente

    // Dividimos la fecha ingresada en partes (año, mes, día)
    const partesFecha = fechaValue.split("-");
    const anio = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]) - 1; // Los meses en JavaScript comienzan desde 0 (enero = 0)
    const dia = parseInt(partesFecha[2]);

    let mensaje = "";

    // Creamos una nueva instancia de Date utilizando las partes de la fecha ingresada
    const fechaAjustada = new Date(anio, mes, dia);
    //console.log(fechaObtenida); // Imprimimos la fecha en formato ISO para verla en UTC
    if (!verificacionMayorEdad(fechaAjustada)) { //ese metodo regresa true si tiene al menos 18 años y false si no
        //entonces el signo ! es para negar quiere decir si lo que me regresa es falso
        //es como si pusiera if(verificacionMayorEdad(fechaAjustada)==false) pero es 
        //código más limpio
        mensaje = "Debes tener al menos 18 años de edad"
    };
    fechaInput.setCustomValidity(mensaje);//sirve para mandar un mensaje al usuario, si esta vacío lo deja continuar
}


//funcion para ver si es mayor de edad
function verificacionMayorEdad(fecha) {
    //debemos de hacer la comparacion entre la fecha del systema
    //y la que ingreso el usuario
    const fechaActual = new Date(); //no necesita parametros para 
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, //basicamente aqui sumamos al año que fue capturado por el usaurio 18 (que es la edad minima)
        fecha.getUTCMonth(), //obtenemos su mes 
        fecha.getUTCDate()//y su día, estos dos son importantes para crear una instacia date que será
        //la fehca a comparar con el mes y dia, no basta año
    );
    //porque si una persona nacio en el 2005 pero en diciembre, del 2005 a 2023 si son 18 años
    //pero si tomamos en cuenta los meses, aun no pasan 18 años exactos.

    //es por eso que se hace esta coparación, si la fecha nueva que se genero
    //es menor o igual a la fecha del sistema, quiere decir que tiene los
    //18 años, pero si es mayor, quiere decir que aun no llegamos a ese año
    //y por tanto no tiene 18 años
    return diferenciaFechas <= fechaActual;
}