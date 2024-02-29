const express = require("express");
const ProductManager = require("./productManager");

const app = express();
const productManager = new ProductManager();



app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(parseInt(pid));
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Servidor en ejecución en http://localhost:8080");
});
async function addNewProducts() {
  try {
    await productManager.addProducts(
      "Notebook Lenovo",
      "Notebook Lenovo de 13 pulgadas, core i9, con placa de video",
      200,
      "Alguna Imagen",
      "sdj234",
      25
    );

    await productManager.addProducts(
      "Monitor LCD",
      "Monitor LCD de 24 pulgadas",
      58800,
      "imagen monitor",
      "lkh234",
      27
    );

    await productManager.addProducts(
      "Mouse",
      "Mouse Logitech",
      28800,
      "imagen mouse",
      "lkm235",
      66
    );

    await productManager.addProducts(
      "Guitarra",
      "Guitarra eléctrica marca Kapone",
      42322,
      "fotoGuitarra",
      "234oio",
      23
    );

    await productManager.addProducts(
      "Teclado",
      "Teclado mecánico RGB",
      8999,
      "imagen teclado",
      "oieo94",
      50
    );

    await productManager.addProducts(
      "Auriculares",
      "Auriculares inalámbricos",
      3499,
      "imagen auriculares",
      "a84h2l",
      100
    );

    await productManager.addProducts(
      "Impresora",
      "Impresora láser multifuncional",
      15799,
      "imagen impresora",
      "8fh3ks",
      18
    );

    await productManager.addProducts(
      "Cámara",
      "Cámara digital 20MP",
      7899,
      "imagen cámara",
      "c57x9s",
      35
    );

    await productManager.addProducts(
      "Smartphone",
      "Smartphone Android de última generación",
      23999,
      "imagen smartphone",
      "p92n4a",
      80
    );

    await productManager.addProducts(
      "Altavoces",
      "Altavoces Bluetooth portátiles",
      4999,
      "imagen altavoces",
      "s2y7dr",
      42
    );
  } catch (error) {
    console.log(error.message);
  }
}

// Llamada a la función asincrónica
addNewProducts();
