/* create.js */

import productService from "./product.service.mock.js";

console.log('We are on the add product page');

document.getElementById('product-form')
    .addEventListener('submit', submitProductForm);

async function submitProductForm(event) {
    event.preventDefault();
    const productForm = event.target;
    const valid = validateProductForm(productForm);
    
    if (valid) {
        console.log('Form is valid');
        
        const formData = new FormData(productForm);
        const productObject = {};
        formData.forEach((value, key) => {
            if (key === 'price' || key === 'stock') {
                productObject[key] = Number(value);
            } else {
                productObject[key] = value;
            }
        });

        const eleNameError = productForm.name.nextElementSibling;
        try {
            await productService.saveProduct(productObject);
            eleNameError.classList.add('d-none');
            productForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This product already exists!";
        }
    } else {
        console.log('Form is invalid');
    }
}

function validateProductForm(form) {
    console.log('Validating form');
    let valid = true;
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this product!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    const price = form.price.value;
    const elePriceError = form.price.nextElementSibling;
    if (price === "") {
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Enter product price!";
        valid = false;
    } else if (isNaN(price)) {
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Price must be a number!";
        valid = false;
    } else {
        elePriceError.classList.add('d-none');
    }
    
    return valid;
}
