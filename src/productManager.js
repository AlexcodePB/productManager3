const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.path =
      "/Users/alex/Desktop/coding/back-end/dasafiosEntregables/tercerDesafio/src/products.json";
    this.products = [];
    this.id = 0;
    this.loadProducts();
  }

  async loadProducts() {
    const fileContent = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(fileContent);
    this.id =
      this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
  }

  async addProducts(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Error: todos los campos son requeridos");
    }

    const file = await fs.readFile(this.path, "utf-8");
    const products = file ? JSON.parse(file) : [];

    const isDuplicated = products.find((product) => product.code === code);
    if (isDuplicated) {
      console.log("El producto con código:", code, "ya existe");
      return;
    }

    const newProduct = {
      id: this.#generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
    };
    products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(products));
    console.log(`Producto ${newProduct.title} agregado con éxito`);
  }

  #generateId() {
    return ++this.id;
  }

  async getProducts() {
    const fileProducts = await fs.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    return fileProductsParse;
  }

  async getProductById(id) {
    const fileProducts = await fs.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);
    if (findProd) {
      return findProd;
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async updateProduct(id, prop, newValue) {
    const fileProducts = await fs.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);
    if (findProd == undefined) {
      throw new Error("Producto no encontrado");
    } else {
      findProd[prop] = newValue;
      const productsString = JSON.stringify(fileProductsParse);
      await fs.writeFile(this.path, productsString);
    }
  }

  async deleteProducts(id) {
    const fileProducts = await fs.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const positionProduct = fileProductsParse.findIndex(
      (prod) => prod.id == id
    );
    if (positionProduct == -1) {
      throw new Error("Producto no encontrado");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );
      const productsString = JSON.stringify(productsDelete);
      await fs.writeFile(this.path, productsString);
    }
  }

  async clearProducts() {
    const data = JSON.stringify([]);
    await fs.writeFile(this.path, data);
  }
}

module.exports = ProductManager;
