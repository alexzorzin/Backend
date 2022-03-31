const fs = require("fs");
const express = require('express');

class contenedor {
    constructor(filename) {
        this.filename = filename
    }
    save(productos) {
        const filename = this.filename
        async function readFile() {
            try {

                // Lee el txt de productos. si se borra y no sabes que poner pongo el original: 
                const contenido = await fs.promises.readFile(`./${filename}.txt`, 'utf-8');
                let oldProduct = JSON.parse(contenido);
                oldProduct[0].id = 1;

                // Sobreescribe el txt con nuevos valores que luego seran dados
                let oldProductAux = JSON.stringify(oldProduct).slice(0, -1) + ',';
                let newProductAux = JSON.stringify(productos).slice(1,);
                let bothProducts = oldProductAux + newProductAux;
                await fs.promises.writeFile(`./${filename}.txt`, bothProducts);

                // array de productos definitivo
                let finalProducts = JSON.parse(bothProducts);
                console.log("\n TIENDA ARGENTINA PARA EXTRANJEROS O EXHABITANTES ARGENTINOS")

                // le agrega una id a los productos y los deja en el txt
                for (let i = 0; i < finalProducts.length; i++) {
                    finalProducts[i].id = i + 1;
                    console.log(`ID Number: ${finalProducts[i].id}`);
                }
                await fs.promises.writeFile(`./${filename}.txt`, JSON.stringify(finalProducts));
                // console.log(finalProducts);
                return finalProducts;

            }
            catch (error) {
                throw new Error(error)
            }
        }
        readFile(filename)
    }

    // muestra solo los id en consola
    getById(id) {
        const filename = this.filename
        async function getById() {
            try {
                const contenido = await fs.promises.readFile(`./${filename}.txt`, 'utf-8');
                let productos = JSON.parse(contenido)
                const foundId = productos.find(e => e.id == id)
                console.log(foundId)
            } catch (error) {
                console.log(error)
            }

        } getById(filename)
    }

    // obtiene el array completo
    getAll() {
        const filename = this.filename
        async function getAll() {
            try {
                const contenido = await fs.promises.readFile(`./${filename}.txt`, 'utf-8');
                let productos = JSON.parse(contenido)
                console.log('\n TU CARRITO:')
                console.log(productos)
            } catch (error) {
                console.log(error)
            }

        } getAll(filename)
    }

    // elimina cada objeto por id
    deleteById(id) {
        const filename = this.filename
        async function deleteById() {
            try {
                const contenido = await fs.promises.readFile(`./${filename}.txt`, 'utf-8');
                let productos = JSON.parse(contenido)
                const foundId = productos.filter(e => e.id != id)
                console.log(foundId)
                await fs.promises.writeFile(`./${filename}.txt`, JSON.stringify(foundId));
            } catch (error) {
                console.log(error)
            }

        } deleteById(filename, id)
    }
    // elimina todo con el metodo splice
    deleteAll() {
        const filename = this.filename
        async function deleteAll() {
            try {
                const contenido = await fs.promises.readFile(`./${filename}.txt`, 'utf-8');
                let productos = JSON.parse(contenido)
                productos.splice(0,)
                console.log('HAS ELIMINADO LOS PRODUCTOS DEL CARRITO')
                await fs.promises.writeFile(`./${filename}.txt`, JSON.stringify(productos));
            } catch (error) {
                console.log(error)
            }

        } deleteAll(filename)
    }

}

//// Express server y respuesta de consignas
const app = express();

// a)
async function getProductos() {
    try {
        const contenido = await fs.promises.readFile(`./producto.txt`, 'utf-8');
        let finalProducts = JSON.parse(contenido);
        console.log("\nTIENDA ARGENTINA | CARRITO:"),
        console.log(finalProducts);
        app.get('/producto', (req, res) => {
            res.send({ contenido });
        });
        return finalProducts;
    }
    catch (err) {
        throw new Error(err);
    }
}
getProductos();

// b)
async function getProductosRandom() {
    try {
        const contenido = await fs.promises.readFile(`./producto.txt`, 'utf-8');
        let finalProducts = JSON.parse(contenido);
        
        const productoRandom = finalProducts[Math.floor(Math.random() * finalProducts.length)];
        console.log("\nSUERTE LOCA:")
        console.log(productoRandom)

        const productoRandomAux = JSON.stringify(productoRandom)

        app.get('/productoRandom', (req, res) => {
            res.send({ productoRandomAux });
        });
        return productoRandom;
    }
    catch (err) {
        throw new Error(err);
    }
}
setTimeout(() => { getProductosRandom() }, 500);


const server = app.listen(8080, () => {
    console.log('el server http está en el puerto 8080');
});
server.on('error', error => console.log(error));

module.exports = contenedor;