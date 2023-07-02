Swal.fire({
  title: "¿Eres mayor de 18 años?",
  text: "Debes ser mayor de 18 años para ingresar a esta página",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Sí, soy mayor de 18 años",
  cancelButtonText: "No, soy menor de 18 años",
}).then((result) => {
  if (result.isConfirmed) {
    // Acciones a realizar si el usuario confirma que es mayor de 18 años
    Swal.fire({
      title: "¡Bienvenido!",
      text: "Puedes acceder a la página",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    // Aquí puedes redirigir al usuario a la página principal
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // Acciones a realizar si el usuario cancela o indica que es menor de 18 años
    Swal.fire({
      title: "Acceso denegado",
      text: "Debes ser mayor de 18 años para acceder a esta página",
      icon: "error",
      confirmButtonText: "Aceptar",
    }).then(() => {
      // Redireccionar a Google
      window.location.href = "https://www.google.com";
    });
  }
});

$(document).ready(function() {
  $(".menu-toggle").click(function() {
    $(".menu").toggleClass("show");
  });
});

const bebidas = [
    { nombre: "Corona botella 710ml", precio: 1200, URL: "https://baltimore.com.ar/img/articulos/3831.png" },
    { nombre: "Stella artois 473ml", precio: 590, URL: "https://baltimore.com.ar/img/articulos/4458.png" },
    { nombre: "Patagonia bohemian 410ml", precio: 600, URL: "https://baltimore.com.ar/img/articulos/3828.png" },
    { nombre: "Blue moon 335ml", precio: 550, URL: "https://baltimore.com.ar/img/articulos/1930.png" },
    { nombre: "Heineken porron 330ml", precio: 350, URL: "https://baltimore.com.ar/img/articulos/35.png" },
    { nombre: "Rutii malbec 1500ml", precio: 17000, URL: "https://baltimore.com.ar/img/articulos/4524.png" },
    { nombre: "A lisa malbec 750ml", precio: 10000, URL: "https://baltimore.com.ar/img/articulos/1961.png" },
    { nombre: "Cinco sentidos 750ml", precio: 2500, URL: "https://baltimore.com.ar/img/articulos/5023.png" },
    { nombre: "Abras torrontes 750ml", precio: 3700, URL: "https://baltimore.com.ar/img/articulos/3030.png" },
    { nombre: "Alma gemelas 750ml", precio: 3650, URL: "https://baltimore.com.ar/img/articulos/5061.png" },
    { nombre: "Chivas regal 12 años 750ml", precio: 10600, URL: "https://http2.mlstatic.com/D_NQ_NP_607103-MLA50056333219_052022-W.webp" },
    { nombre: "Jack daniels 1l", precio: 13000, URL: "https://www.puroescabio.com.ar/web/image/product.template/50018/image_256/%5B1368%5D%20JACK%20DANIELS%20TENNESSEE%20N7%20750ml?unique=8116f56" },
    { nombre: "Jack daniels 1l", precio: 12000, URL: "https://www.puroescabio.com.ar/web/image/product.template/49989/image_256/%5B1355%5D%20JACK%20DANIELS%20HONEY%20750ml?unique=8116f56" },
    { nombre: "jhonny walker red label 1l", precio: 6700, URL: "https://www.puroescabio.com.ar/web/image/product.template/50122/image_256/%5B1419%5D%20JOHNNIE%20WALKER%20RED%20LABEL%201000ml?unique=8116f56" },
    { nombre: "jhonny walker black label 1l", precio: 13000, URL: "https://www.puroescabio.com.ar/web/image/product.template/53358/image_256/%5B3297%5D%20JOHNNIE%20WALKER%20BLACK%20200%20YEARS%20700ml.?unique=8116f56" },
    { nombre: "Skyy 1l", precio: 2600, URL: "https://www.puroescabio.com.ar/web/image/product.template/53359/image_256/%5B3296%5D%20SKYY%20COCONUT%20750ml?unique=8116f56" },
    { nombre: "Smirnoff 1l", precio: 2600, URL: "https://www.puroescabio.com.ar/web/image/product.template/52289/image_256/%5B2178%5D%20SMIRNOFF%20RASPBERRY%20750ml?unique=8116f56" },
    { nombre: "Absolut blue 1l", precio: 6600, URL: "https://www.puroescabio.com.ar/web/image/product.template/47906/image_256/%5B19%5D%20ABSOLUT%20BLUE%20700ml?unique=8116f56" },
    { nombre: "Sol azteca 1l", precio: 2600, URL: "https://www.puroescabio.com.ar/web/image/product.template/63183/image_256/%5B4270%5D%20SOL%20AZTECA%201000ml?unique=8116f56" },
    { nombre: "Jose cuervo silver 1l", precio: 9600, URL: "https://www.puroescabio.com.ar/web/image/product.template/50135/image_256/%5B1425%5D%20JOSE%20CUERVO%20SILVER%20750ml?unique=8116f56" },
  ];

  let carrito = [];

  // Función para cargar el carrito desde el almacenamiento777
function cargarCarritoDesdeStorage() {
  const carritoJSON = localStorage.getItem("carrito");
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
    actualizarCarrito();
  }
}

// Función para guardar el carrito en el almacenamiento777
function guardarCarritoEnStorage() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJSON);
}


  // Función para calcular el precio total del carrito
  function calcularPrecioTotal() {
    let total = 0;
    carrito.forEach(bebida => {
      total += bebida.precio * bebida.cantidad;
    });
    return total;
  }

  // Función para aplicar el impuesto del 21% al precio total
  function aplicarImpuesto(precioTotal) {
    const impuesto = 0.21; // 21%
    return precioTotal * (1 + impuesto);
  }

  // Función para aplicar descuento si el precio total supera los $5000
  function aplicarDescuento(precioTotal) {
    const descuento = 0.1; // 10%
    if (precioTotal > 25000) {
      return precioTotal * (1 - descuento);
    }
    return precioTotal;
  }

  // Función para actualizar el carrito y el precio total en el DOM
  function actualizarCarrito() {
    const carritoElement = document.getElementById("carrito");
    const totalElement = document.getElementById("total");
    guardarCarritoEnStorage();

    carritoElement.innerHTML = "";
    carrito.forEach(bebida => {
      const item = document.createElement("div");
      item.innerHTML = `${bebida.nombre} - Cantidad: ${bebida.cantidad}`;
      carritoElement.appendChild(item);
    });

    const precioTotal = calcularPrecioTotal();
    const precioConImpuesto = aplicarImpuesto(precioTotal);
    const precioConDescuento = aplicarDescuento(precioConImpuesto);

    totalElement.innerHTML = `Total: $${precioConDescuento.toFixed(2)}`;
  }

  // Función para agregar una bebida al carrito
  function agregarBebida(index) {
    const bebida = bebidas[index];
    const bebidaEnCarrito = carrito.find(item => item.nombre === bebida.nombre);

    if (bebidaEnCarrito) {
      bebidaEnCarrito.cantidad++;
    } else {
      bebida.cantidad = 1;
      carrito.push(bebida);
    }

    actualizarCarrito();
  }

  const finalizarButton = document.getElementById("finalizar");
  finalizarButton.addEventListener("click", procesarCompra);
  
  // Función para procesar la compra y mostrar la confirmación
  function procesarCompra() {
    Swal.fire({
      title: "Confirmación de compra",
      text: "¿Deseas realizar la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar"
    }).then(function(result) {
      // Verificar si se hizo clic en "Sí, comprar"
      if (result.isConfirmed) {
        // Acciones a realizar al confirmar la compra
        Swal.fire("¡Compra realizada!", "Tu compra ha sido procesada.", "success");
        carrito = []; // Vaciar el carrito después de realizar la compra
        actualizarCarrito();
      }
    });
  }

  // Crear las tarjetas de las bebidas
  const cotizadorElement = document.getElementById("cotizador");
  bebidas.forEach((bebida, index) => {
    const card = document.createElement("div");
    card.className = "card col-md-2 mx-3";
    card.style.width = "18rem";

    const img = document.createElement("img");
    img.src = bebida.URL;
    img.className = "card-img-top img-fluid";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const nombre = document.createElement("p");
    nombre.className = "card-title";
    nombre.textContent = bebida.nombre;

    const precio = document.createElement("h4");
    precio.className = "card-text";
    precio.textContent = `$${bebida.precio}`;

    const boton = document.createElement("button");
    boton.className = "btn btn-dark";
    boton.textContent = "agregar";
    boton.addEventListener("click", () => agregarBebida(index));

    cardBody.appendChild(nombre);
    cardBody.appendChild(precio);
    cardBody.appendChild(boton);

    card.appendChild(img);
    card.appendChild(cardBody);

    cotizadorElement.appendChild(card);
  });
