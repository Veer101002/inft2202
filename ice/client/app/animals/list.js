import animalService from "../animal.service.js";
function list({ page = 1, perPage = 20 }) {
    const container = document.createElement('div');
    container.className = 'container mt-4';

    async function loadData() {
        try {
            const { records, pagination } = await animalService.getAnimalPage({ page, perPage });
            
            // Clear container
            container.innerHTML = '';
            
            // Create table
            const table = document.createElement('table');
            table.className = 'table table-striped';
            
            // Table headers
            const headers = ['Name', 'Breed', 'Legs', 'Eyes', 'Sound', 'Actions'];
            const headerRow = table.insertRow();
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });

            // Table rows
            records.forEach(animal => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${animal.name}</td>
                    <td>${animal.breed}</td>
                    <td>${animal.legs}</td>
                    <td>${animal.eyes}</td>
                    <td>${animal.sound}</td>
                    <td>
                        <a href="./animal.html?name=${encodeURIComponent(animal.name)}" 
                           class="btn btn-primary btn-sm">
                            Edit
                        </a>
                        <button class="btn btn-danger btn-sm delete-btn" 
                                data-name="${animal.name}">
                            Delete
                        </button>
                    </td>
                `;
            });

            // Pagination controls
            const paginationDiv = document.createElement('div');
            paginationDiv.className = 'mt-3';
            if (pagination.pages > 1) {
                let html = `<nav><ul class="pagination">`;
                for (let i = 1; i <= pagination.pages; i++) {
                    html += `<li class="page-item ${i === page ? 'active' : ''}">
                        <a class="page-link" href="./list.html?page=${i}&perPage=${perPage}">${i}</a>
                    </li>`;
                }
                html += `</ul></nav>`;
                paginationDiv.innerHTML = html;
            }

            // Delete handlers
            container.addEventListener('click', async (e) => {
                if (e.target.classList.contains('delete-btn')) {
                    const name = e.target.dataset.name;
                    if (confirm(`Delete ${name} permanently?`)) {
                        await animalService.deleteAnimal(name);
                        loadData(); // Refresh data
                    }
                }
            });

            container.append(table, paginationDiv);
            
        } catch (err) {
            container.innerHTML = `<div class="alert alert-danger">Error loading data: ${err.message || err}</div>`;
        }
    }

    loadData();
    return { element: container };
}

export default list;