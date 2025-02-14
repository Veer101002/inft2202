/* product.service.mock.js */

class ProductService {
    constructor() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }

    getProducts() {
        return JSON.parse(localStorage.getItem('products'));
    }

    getProductPage({ page = 1, perPage = 15 }) {
        let records = this.getProducts();
        let pagination = {
            page: page,
            perPage: perPage,
            pages: Math.ceil(records.length / perPage)
        };
        if (pagination.page < 1) pagination.page = 1;
        if (pagination.page > pagination.pages) pagination.page = pagination.pages;
        let start = (pagination.page - 1) * perPage;
        let end = start + perPage;
        return {
            records: records.slice(start, end),
            pagination
        };
    }

    saveProduct(product) {
        const products = this.getProducts();
        if (products.find(p => p.name === product.name)) {
            throw new Error('A product with that name already exists!');
        }
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }

    findProduct(productName) {
        return this.getProducts().find(p => p.name === productName) || null;
    }

    updateProduct(updatedProduct) {
        let products = this.getProducts();
        let index = products.findIndex(p => p.name === updatedProduct.name);
        if (index === -1) return false;
        products[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }

    deleteProduct(product) {
        let products = this.getProducts();
        let idx = products.findIndex(p => p.name === product.name);
        if (idx === -1) {
            throw new Error('That product does not exist!');
        }
        products.splice(idx, 1);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }
}

export default new ProductService();
