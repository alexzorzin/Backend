const config = require('../options/config')
const firebaseClient = require("./firebase")
const productsApi = new firebaseClient(config.firebase, "products");

const products = []
const lastProduct = async () => {
  try {
    if (products.length == 0) {
      products.push(await productsApi.readAll())
      console.log(await products[0])
    }
    else {
      await productsApi.createProductsTable()
      await productsApi.addElements(products)
      console.log(await productsApi.readAll())
    }

  }
  catch (error) {
    console.log(error);
  }
}

module.exports =  { products, productsApi, lastProduct }