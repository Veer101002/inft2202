
/*
 *  Service constructor
 */
function ProductService() {
    // if there is no entry for products in local storage
    if (!localStorage.getItem('products')) {
        // create a new entry in local storage and put an empty array in it
        localStorage.setItem('products', JSON.stringify([]))
    }
}

/*
 *
 */
ProductService.prototype.getProducts = function() {
    // this will always be set, because we did it in the constructor
    return JSON.parse(localStorage.getItem('products'));
}

/*
 *
 */
ProductService.prototype.saveProduct = function(product) {
    // get a list of products
    const products = this.getProducts();
    // see if this product already exists
    if (products.find(a => a.name == product.name)) {
        // tell the caller we're not going to save this
        throw new Error('An product with that name already exists!');
    }
    // if it doesn't, add it to the array
    products.push(product);
    // and save it in storage again
    localStorage.setItem('products', JSON.stringify(products));
    // tell the caller all was well
    return true;
}

/*
 *
 */
ProductService.prototype.findProduct = function(productName) {
    const products = this.getProducts();
    const product = products.find(a => a.name == productName);
    if (!product) {
        throw new Error('That product does not exist!');
    }
    return product;
}

/*
 *
 */
ProductService.prototype.updateProduct = function(product) {
    const products = this.getProducts();
    const idx = products.findIndex(a => a.name == product.name);
    if (idx === -1) {
        throw new Error('That product does not exist!');
    }
    products[idx] = product;
    localStorage.setItem('products', JSON.stringify(products));
    return true;
}

/*
 *
 */
ProductService.prototype.deleteProduct = function(product) {
    const products = this.getProducts();
    const idx = products.findIndex(a => a.name == product.name);
    if (idx === -1) {
        throw new Error('That product does not exist!');
    }
    products.splice(idx, 1);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
}

export default new ProductService();