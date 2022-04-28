const express = require ('express');
const fs = require ('fs')
const { Server: IOServer} = require ('socket.io');

const { Server: HttpServer } = require ('http');

const productos = require('./api/productos');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

const messages = [];

const lastMessage = async () =>{
    const lastContent = await fs.promises.readFile(`./messages.txt`, 'utf-8');
        for (let i=0; i<JSON.parse(lastContent).length;i++){
            messages.push(JSON.parse(lastContent)[i])
        }
}
lastMessage()

io.on('connection', async (socket) => {
    console.log('Usuario conectado');

    // productos
    socket.emit('productos', productos);    

    socket.on('nuevoProducto', producto =>{
        productos.push(producto);
        io.sockets.emit('productos', productos)
        
    })
    //Envio de mensaje
    socket.emit('messages', messages);

    socket.on('newMessage', data =>{
        // messages.push({ socketid: socket.id , message: data });
        messages.push(data);
        io.sockets.emit('messages', messages);
        fs.promises.writeFile(`/messages.txt`, JSON.stringify(messages));
    });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

httpServer.listen(8080, () => console.log('SERVER ON'));