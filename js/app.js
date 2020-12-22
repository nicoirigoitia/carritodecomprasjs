//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners () {
  //Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso)

  //Vaciar carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; //Reseteamos el arreglo
    limpiarHTML(); //Eliminamos el HTML del carrito
  })
}

//Funciones
function agregarCurso(e) {

  //Al haberle puesto e como parametro puedo usar e.target.classList para ver las clases que tiene ese elemento al imprimirlo en consola con console.log y asi ir armando la funcion
  e.preventDefault(); //prevenimos la accion por default, en este caso es que nos redirija al index al hacer click en el
  if(e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Eliminar curso del carrito
function eliminarCurso (e) {
  if(e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    //Elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

    carritoHTML() //Iteramos sobre el carrito y mostramos su HTML
  }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
  

  //Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
  if(existe) {
    //Actualiza la cantidad
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso //Retorna el objeto actualizado
      } else {
        return curso; //Retorna los objetos que no son duplicados
      }
      articulosCarrito = [...cursos];
    });
  } else {
    //Agrega elementos al arreglo carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  
  
  console.log(articulosCarrito)

  carritoHTML()
}

//Muestra el carrito de compras en el HTML
function carritoHTML () {
  
  //Limpiar el HTML
  limpiarHTML()


  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach( curso => {
    const { imagen, titulo, precio, cantidad, id } = curso; //destructuring para generar las variables que se van a utilizar mas abajo y no acceder al elemento con, por ejemplo curso.precio, sino solo con precio. Esto extrae cada elemento y crea una variable con el nombre (imagen, titulo, etc..)
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href='#' class='borrar-curso' data-id="${id}"> X </a>
      </td>
    `;

    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

}

//Elimina los cursos del tbody
function limpiarHTML () {

  //Se ejecuta el while mientras haya elementos en el carrito, y los borra
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}