const socket = io.connect();

// agregar producto
function addProduct(e) {
  event.preventDefault();
  const producto = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  socket.emit('nuevoProducto', producto);
  alert("Has agregado un producto al carrito");
  return false;
}

// tabla de productos
function tableProducts(productos) {
  return fetch('./partials/productsTable.hbs')
    .then(ans => ans.text())
    .then(plantilla => {
      const temp = Handlebars.compile(plantilla);
      const htmlTable = temp({ productos });
      document.getElementById('productos').innerHTML = htmlTable;
      return htmlTable;
    })
}

socket.on('productos', productos => {
  tableProducts(productos);
});

// render de mensajes
function render(messages) {
  const messagesHtml = messages.map((message, index) => {
    return (`<div>
      <p class="author">${message.author} <span class="date">[${message.date}]</span>: <span class="text">${message.text}</span> </p>
              </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML = messagesHtml;
}

function addMessage(e) {
  event.preventDefault();
  const message = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value,
    date: new Date().toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short"
    })
  };
  socket.emit('newMessage', message);
  return false;
}

socket.on('messages', data => {
  render(data);
});

// const input = document.querySelector('input');

// const button = document.getElementById('sendAction');

// if (button) {
//   button.addEventListener('click', () => {
//     socket.emit('message', input.value);
//   })
// }

// socket.on('messages', messages => {
//     const htmlMessages = messages.map(
//         message => `SocketId: ${message.socketid} -> Mensaje: ${message.message}`
//     ).join('<br>');

//     document.querySelector('p').innerHTML = htmlMessages;
// });
