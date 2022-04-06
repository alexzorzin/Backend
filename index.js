const express = require('express');
const { Router } = express;
const app = express();
const errorObj = [{ error: 'No se ha encontrado un producto' }];

// en la ruta "/api/productos/agregar-nuevo/" podrás agregar un nuevo producto
app.use('/api/productos/agregar-nuevo', express.static(__dirname + '/public'));

// Stock de la tienda
const stock = new Router();
stock.use(express.json());
stock.use(express.urlencoded({ extended: true }));

let productos = [
    {
        title: 'Six-Pack Quilmes',
        price: 1100,
        thumbnail: 'https://superlago.com.ar/wp-content/uploads/2022/02/004-003-016_cerveza-quilmes-x-473-cm3-pack-6-latas1-9d71ecbcaa3e4d8fe315901031574166-640-0.jpg',
        id: 1
    },
    {
        title: 'Don Satur salados',
        price: 570,
        thumbnail: 'https://www.deliargentina.com/image/cache/catalog/product/alimentacion/bizcochitos-salados-de-grasa-don-satur-argentinos/bizcochitos-salados-de-grasa-don-satur-argentinos-1000x1000.png',
        id: 2
    },
    {
        title: 'Agua Villavicencio',
        price: 105,
        thumbnail: 'https://jumboargentina.vtexassets.com/arquivos/ids/556225/Villavicencio-Pet-Sin-Gas-15-L-2-239949.jpg?v=637105938782970000',
        id: 3
    }
];

// en el get se obtienen los productos
stock.get('/', (req, res) => {
    if (productos.length >= 1) {
        res.json(productos);
        console.log("\n TIENDA ARGENTINA | TU CARRITO:");
        console.log(productos);
    }
    else {
        res.json(errorObj);
        console.log("No se encontraron productos")
    }
});

// se usa el get para obtener los productos según su ID
stock.get('/:id', (req, res) => {
    const id = req.params.id;

    if (productos.length >= id && id > 0) {
        res.send(productos[id - 1]);
        console.log(`\nEstás solicitando: ${productos[id - 1].title}`);
    }
    else if (typeof productos !== "number") {
        res.send(errorObj);
        console.log("\nNo se ha encontrado un producto");
    }
    else {
        res.send(errorObj);
        console.log("\nNo se ha encontrado un producto");
    }
});

// este post es el que recibe info del HTML y lo agrega acá con su ID.
stock.post('/', (req, res) => {
    idNumber = {
        id: productos.length + 1
    };
    const finalResult = Object.assign(req.body, idNumber);
    productos.push(finalResult);
    res.json(finalResult);
    console.log(`\nHas agregado: ${finalResult.title} Con el ID: ${finalResult.id}`);
});

//el put recibe los objetos y los actualiza según su ID
stock.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`\n Reemplazaste ${productos[id - 1].title} de ID: ${id} por:`);
    //Reemplazar el producto por el que se indicó con el ID
    let idReemplazado = productos[id - 1];

    idReemplazado = {
        title: "Yerba Mate",
        price: "415",
        thumbnail: "https://walmartar.vteximg.com.br/arquivos/ids/877254-292-292/Yerba-Mate-4f-Taragui-1-Kg-1-475107.jpg?v=637390238815800000",
        id: id
    };

    productos[id - 1] = idReemplazado;
    console.log(`${productos[id - 1].title} con ID: ${id}`);
    res.json(productos);
});

//borrar el producto
stock.delete('/:id', (req, res) => {
    const id = req.params.id;
    const productoEliminado = productos.splice(id - 1, 1);
    productos.splice(id - 1, 1);
    res.json(productos);
    console.log("\nHas eliminado correctamente:");
    console.log(productoEliminado);
});

app.use('/api/productos', stock);

// servidor
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`SERVIDOR ABIERTO EN EL PUERTO ${server.address().port}`);
})

server.on('error', error => console.log(`Error en el servidor ${error}`))