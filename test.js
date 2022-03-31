const contenedor = require('./contenedor.js')
// aca se ingresan los datos
const Contenedor = new contenedor("producto")

// aca se ingresan los nuevos valores que anteriormente mencione
Contenedor.save(
    productos = [
        {
            title: 'Don Satur salados',
            price: 105,
            thumbnail: 'https://www.deliargentina.com/image/cache/catalog/product/alimentacion/bizcochitos-salados-de-grasa-don-satur-argentinos/bizcochitos-salados-de-grasa-don-satur-argentinos-1000x1000.png',
            id: 0
        },
        {
            title: 'Guaymallén',
            price: 35,
            thumbnail: 'https://www.mayoristadegolosina.com.ar/images/000000000000ALBL96200guaymallen-alfajor-simple-blanco.jpg',
            id: 0
        },
        {
            title: 'Yerba Mate',
            price: 415,
            thumbnail: 'https://walmartar.vteximg.com.br/arquivos/ids/877254-292-292/Yerba-Mate-4f-Taragui-1-Kg-1-475107.jpg?v=637390238815800000',
            id: 0
        }
    ]
);

// aca se llaman las funciones. (PARA PROBAR DELETEALL DEBERÁS DESCOMENTAR LA FUNCION)
setTimeout(() => { Contenedor.getById(3) }, 1000);
setTimeout(() => { Contenedor.getAll() }, 1500);
setTimeout(() => { Contenedor.deleteById(4) }, 2000);
// setTimeout(() => { Contenedor.deleteAll() }, 2500);