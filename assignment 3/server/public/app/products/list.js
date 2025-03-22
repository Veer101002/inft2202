import productService from "../product.service.js";

function list(recordPage) {
    const container = document.createElement('div');
    container.classList.add('container');

    function createTable(products) {
        const table = document.createElement('table');
        table.className = 'table table-striped';
        
        // Table Header
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        ['Name', 'Description', 'Price', 'Stock', 'Actions'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        // Table Body
        products.forEach(product => {
            const row = table.insertRow();
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = product.description;
            row.insertCell().textContent = product.price;
            row.insertCell().textContent = product.stock;

            const actionCell = row.insertCell();
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger mx-1';
            deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
            deleteBtn.onclick = () => productService.deleteProduct(product.name)
                .then(() => window.location.reload());

            const editBtn = document.createElement('a');
            editBtn.className = 'btn btn-primary mx-1';
            editBtn.innerHTML = '<i class="fa fa-edit"></i>';
            editBtn.href = `./product.html?name=${product.name}`;

            actionCell.append(editBtn, deleteBtn);
        });

        return table;
    }

    function createPagination(pagination) {
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        ul.className = 'pagination';

        // Previous Button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${pagination.page === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="./list-products.html?page=${pagination.page - 1}">Previous</a>`;
        ul.appendChild(prevLi);

        // Page Numbers
        for (let i = 1; i <= pagination.pages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === pagination.page ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="./list-products.html?page=${i}">${i}</a>`;
            ul.appendChild(li);
        }

        // Next Button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${pagination.page === pagination.pages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="./list-products.html?page=${pagination.page + 1}">Next</a>`;
        ul.appendChild(nextLi);

        nav.appendChild(ul);
        return nav;
    }

    function loadData() {
        const loading = document.createElement('div');
        loading.className = 'text-center';
        loading.innerHTML = '<i class="fa fa-3x fa-spinner fa-spin"></i>';
        container.appendChild(loading);

        productService.getProductPage(recordPage)
            .then(({ records, pagination }) => {
                container.innerHTML = '';
                container.appendChild(createPagination(pagination));
                container.appendChild(createTable(records));
            })
            .catch(error => {
                container.innerHTML = `<div class="alert alert-danger">${error}</div>`;
            });
    }

    loadData();
    return { element: container };
}

export default list;