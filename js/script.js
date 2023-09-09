// PAGINA
const btnDeslogear = document.getElementById("deslogear");

document.addEventListener("DOMContentLoaded", () => {
    function comprobarLogin() {
        return ((localStorage.getItem("email") != null) && (localStorage.getItem("password") != null))
    }
    if (!comprobarLogin()) {
        location.href = "login.html"
    }

})
btnDeslogear.addEventListener("click", () => {
        localStorage.clear();
        location.href ="login.html"
    });


//  Funcioón Fetch a los productos del archivo JSON

function listadoProductos(){
  fetch('json/productos.json')
  .then(response => response.json())
  .then(data => {
      data.products.forEach(element => {
          console.log(element)
          let h3 = document.createElement("h3");
          h3.innerHTML+= element.nombre + " <br>";
          let h2 = document.createElement("h2");
          h2.innerHTML+= "Precio: $" + element.precio;
          h2.classList.add('precio');
          let button = document.createElement("button");
          button.innerHTML+= "Agregar al Carrito";
          button.classList.add('botoncarro');
          button.addEventListener('click', ()=>{
            agregarAlCarrito(element.nombre,element.precio);

          })
                   
                  
          /* Contenedores y clase de divs*/
          let containerDiv = document.createElement("div")
          containerDiv.classList.add('productcard')

          let imgDiv = document.createElement("div");
          imgDiv.classList.add('imgdiv')
          let h3Div = document.createElement("div");
          let buttonDiv = document.createElement("div");
          buttonDiv.classList.add('botondiv')
          h3Div.classList.add('h3div')
          let imagen = document.createElement("img");
          imagen.setAttribute("src",element.imagen);
          imgDiv.appendChild(imagen);
          h3Div.appendChild(h3);
          h3Div.appendChild(h2);
          buttonDiv.appendChild(button)
          containerDiv.appendChild(imgDiv)
          containerDiv.appendChild(h3Div)
          containerDiv.appendChild(buttonDiv)
          products.appendChild(containerDiv);
      });

  })

}
document.addEventListener ("DOMContentLoaded",()=> {
  listadoProductos();
})

// Carrito de compras


let carrito = [];
let totalCarrito = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    totalCarrito += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const totalElemento = document.getElementById('total');
    carritoLista.innerHTML = '';
    
    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nombre} - $${item.precio}`;
        carritoLista.appendChild(listItem);
    });

    totalElemento.inner = totalCarrito;
}

function mostrarPopUp() {
    const popup = document.getElementById('popup');
    const popupLista = document.getElementById('popup-lista');
    const popupTotalElemento = document.getElementById('popup-total');
    popupLista.innerHTML = '';

    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nombre} - $${item.precio}`;
        popupLista.appendChild(listItem);
    });

    popupTotalElemento.textContent = "$ " + totalCarrito;
    popup.style.display = 'flex';
}

function cerrarPopUp() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// cerrar el pop-up si se hace clic fuera de él
window.addEventListener('click', (event) => {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        cerrarPopUp();
    }
});
