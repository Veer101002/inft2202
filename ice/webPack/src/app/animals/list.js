
import animalService from "../animal.service.js";

function list(app) {
    const {recordPage, animalBuilder} = app;
    const container = document.createElement('div');
    container.classList.add('container');
    const divWaiting = document.createElement('div');
    divWaiting.classList.add('text-center');
    divWaiting.innerHTML = '<i class="fa fa-5x fa-spinner fa-spin"></i>';
    container.append(divWaiting);

    const divMessage = document.createElement('div');
    divMessage.classList.add('alert', 'text-center', 'd-none');
    container.append(divMessage);

    function onSelectPage(pageInfo){
        return event => {
            createContent(pageInfo);
        }
    }
    function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
        function addPage(number, text, style) {
            const li = document.createElement('li');
            li.classList.add('page-item', style);
            const elePageBtn = document.createElement('button');
            elePageBtn.classList.add('page-link');
            elePageBtn.innerText = text;
            let pageInfo = {page:number, perPage};
            elePageBtn.addEventListener('click',onSelectPage(pageInfo));
            li.append(elePageBtn);
            return li;
        }
        const pagination = document.createElement('div');
        if (pages > 1) {
            pagination.classList.remove('d-none');
        }
        const ul = document.createElement("ul");
        ul.classList.add('pagination')
        ul.append(addPage(page - 1, 'Previous', (page == 1) ? 'disabled' : null))
        for (let i = 1; i <= pages; i++) {
            ul.append(addPage(i, i, (i == page) ? 'active' : null));
        }
        ul.append(addPage(page + 1, 'Next', (page == pages) ? 'disabled' : null))

        pagination.append(ul);
        return pagination;
    }
    function drawAnimalTable(animals) {
        const eleTable = document.createElement('table');
        eleTable.classList.add('table', 'table-striped');
        // Create a <thead> element
        const thead = eleTable.createTHead();
        // Create a row in the <thead>
        const row = thead.insertRow();
        // Create and append header cells
        const headers = ['Name', 'Breed', 'Legs', 'Eyes', 'Sound'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            row.appendChild(th);
        });
        for (let animal of animals) {
            const row = eleTable.insertRow();
            // create some rows for each animal field    
            row.insertCell().textContent = animal.name;
            row.insertCell().textContent = animal.breed;
            row.insertCell().textContent = animal.legs;
            row.insertCell().textContent = animal.eyes;
            row.insertCell().textContent = animal.sound;
            // create a cell to hold the buttons
            const eleBtnCell = row.insertCell();
            eleBtnCell.classList.add();
            // create a delete button
            const eleBtnDelete = document.createElement('button');
            eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
            eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
            eleBtnDelete.addEventListener('click', onDeleteButtonClick(animal));
            // add the delete button to the button cell
            eleBtnCell.append(eleBtnDelete);
            // create an edit button
            const eleBtnEdit = document.createElement('button');
            eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
            eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
            eleBtnEdit.addEventListener('click', onEditButtonClick(animal));
            // add the edit button to the button cell
            eleBtnCell.append(eleBtnEdit);
        }
        return eleTable;
    }
    function onDeleteButtonClick(animal) {
        return event => {
            animalService.deleteAnimal(animal.name).then(() => { window.location.reload(); });
        }
    }
    function onEditButtonClick(animal) {
        return event => {
            app.name = animal.name;
            animalBuilder(app);
        }
    }    
    function createContent(pageInfo) {
        divWaiting.classList.remove('d-none');
        animalService.getAnimalPage(pageInfo)
            .then((ret) => {
                container.textContent = '';
                let { records, pagination } = ret;
                divWaiting.classList.add('d-none');
                let header = document.createElement('div');
                header.classList.add('d-flex', 'justify-content-between');
                let h1 = document.createElement('h1');
                h1.innerHTML = 'Animal List';
                header.append(h1);
                header.append(drawPagination(pagination));
                container.append(header);
                container.append(drawAnimalTable(records));
            })
            .catch(err => {
                divWaiting.classList.add('d-none');
                divMessage.innerHTML = err;
                divMessage.classList.remove('d-none');
                divMessage.classList.add('alert-danger');
            });
        return container;
    }
    return {
        element: createContent(recordPage)
    }
}

export default list;
