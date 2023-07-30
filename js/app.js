//importamos la funcion que recibe las validaciones
import { valida } from "./validaciones.js";

//ahora necesitamos agregar el addEvenListener que va a mandar a 
//llamar la funcion cada vez que el usuario salga del input

//para eso seleccionamos todos los inputs ya que tiene un 
//comportamiento similar
const inputs = document.querySelectorAll("input");

//como lo que nos retorna es una ista
//los iteramos con un for each
//para agregarles el addEvenlistener a cada uno
//de tipo "blur" una vez que salga del foco 
//desencadenara la funcion valida, pasandole como parametro
//el input con el target para identificarlos
inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});
