import animalService from "../animal.service.js"; 
async function animal(name) {
    const form = document.createElement('form');
    let animalData = null;

    // Initialize form with existing data
    if (name) {
        try {
            const result = await animalService.findAnimal(name);
            if (result.length > 0) animalData = result[0];
        } catch (err) {
            console.error('Error loading animal:', err);
            return {
                description: 'Error loading animal data',
                element: document.createTextNode('Failed to load animal data')
            };
        }
    }

    function createForm() {
        form.innerHTML = `
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input name="name" class="form-control" 
                    value="${animalData?.name || ''}" 
                    ${animalData ? 'readonly' : ''}>
                <p class="text-danger d-none"></p>
            </div>
            <div class="mb-3">
                <label class="form-label">Breed</label>
                <input name="breed" class="form-control" 
                    value="${animalData?.breed || ''}">
                <p class="text-danger d-none"></p>
            </div>
            <div class="mb-3">
                <label class="form-label">Legs</label>
                <input type="number" name="legs" class="form-control" 
                    value="${animalData?.legs || ''}">
                <p class="text-danger d-none"></p>
            </div>
            <div class="mb-3">
                <label class="form-label">Eyes</label>
                <input type="number" name="eyes" class="form-control" 
                    value="${animalData?.eyes || ''}">
                <p class="text-danger d-none"></p>
            </div>
            <div class="mb-3">
                <label class="form-label">Sound</label>
                <input name="sound" class="form-control" 
                    value="${animalData?.sound || ''}">
                <p class="text-danger d-none"></p>
            </div>
            <button type="submit" class="btn btn-primary">
                ${animalData ? 'Update' : 'Create'} Animal
            </button>
        `;
        return form;
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Convert number fields
        data.legs = Number(data.legs);
        data.eyes = Number(data.eyes);

        try {
            if (animalData) {
                await animalService.updateAnimal(data);
            } else {
                await animalService.saveAnimal([data]);
            }
            window.location.href = './list.html';
        } catch (err) {
            console.error('Submission error:', err);
            alert(`Operation failed: ${err.message || err}`);
        }
    };

    return {
        description: animalData ? 'Edit Animal' : 'New Animal',
        element: createForm()
    };
}

export default animal;