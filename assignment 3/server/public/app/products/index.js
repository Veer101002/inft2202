import productService from "../product.service.js";

async function product(name) {
    const form = document.createElement('form');
    let currentProduct = null;

    function createForm() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="mb-3">
                <label class="form-label">Product Name</label>
                <input type="text" class="form-control" id="name" name="name" 
                    ${currentProduct ? 'readonly' : ''} 
                    value="${currentProduct?.name || ''}">
                <p class="text-danger d-none"></p>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="description" name="description"
                    >${currentProduct?.description || ''}</textarea>
                <p class="text-danger d-none"></p>
            </div>
            <div class="mb-3">
                <label class="form-label">Price</label>
                <input type="number" step="0.01" class="form-control" 
                    id="price" name="price" value="${currentProduct?.price || ''}">
                <p class="text-danger d-none"></p>
            </div>
            <div class="mb-3">
                <label class="form-label">Stock</label>
                <input type="number" class="form-control" 
                    id="stock" name="stock" value="${currentProduct?.stock || ''}">
                <p class="text-danger d-none"></p>
            </div>
            <button type="submit" class="btn btn-primary">
                ${currentProduct ? 'Update' : 'Create'} Product
            </button>
        `;
        form.append(container);
        return form;
    }

    function validate() {
        let valid = true;
        const fields = ['name', 'description', 'price', 'stock'];
        
        fields.forEach(field => {
            const element = form[field];
            const errorElement = element.nextElementSibling;
            
            if (!element.value.trim()) {
                errorElement.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                errorElement.classList.remove('d-none');
                valid = false;
            } else if (['price', 'stock'].includes(field) && isNaN(element.value)) {
                errorElement.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} must be a number`;
                errorElement.classList.remove('d-none');
                valid = false;
            } else {
                errorElement.classList.add('d-none');
            }
        });
        return valid;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) return;

        const productData = {
            name: form.name.value,
            description: form.description.value,
            price: parseFloat(form.price.value),
            stock: parseInt(form.stock.value),
            category: "Electronics" // Add category selector in actual implementation
        };

        try {
            if (currentProduct) {
                await productService.updateProduct(productData);
            } else {
                await productService.saveProduct([productData]);
            }
            window.location.href = './list-products.html';
        } catch (error) {
            form.name.nextElementSibling.textContent = error.message;
            form.name.nextElementSibling.classList.remove('d-none');
        }
    }

    if (name) {
        try {
            const [product] = await productService.findProduct(name);
            currentProduct = product;
            form.addEventListener('submit', handleSubmit);
        } catch (error) {
            return { description: error.message, element: document.createElement('div') };
        }
    } else {
        form.addEventListener('submit', handleSubmit);
    }

    return {
        description: currentProduct ? 'Edit Product' : 'Create Product',
        element: createForm()
    };
}

export default product;