function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

AnimalService.prototype.getAnimals = function () {
    return JSON.parse(localStorage.getItem('animals'));
}

AnimalService.prototype.getAnimalPage = function ({ page = 1, perPage = 20 }) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            let records = JSON.parse(localStorage.getItem('animals'));
            let pagination = {
                page: page,
                perPage: perPage,
                pages: Math.ceil(records.length / perPage)
            }
            if (pagination.page == 2) {
                reject("No Service");
            }
            let start = (pagination.page - 1) * perPage;
            let end = start + perPage;
            resolve({
                records: records.slice(start, end),
                pagination
            });
        }, 500);
    });
}

AnimalService.prototype.saveAnimal = function (animals) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(function () {
            animals.forEach(animal => {
                const _animals = self.getAnimals();
                if (_animals.find(a => a.name == animal.name)) {
                    reject('An animal with that name already exists!');
                }
                _animals.push(animal);
                localStorage.setItem('animals', JSON.stringify(_animals));
            });
            resolve(true);
        }, 250);
    });
}

AnimalService.prototype.findAnimal = function (animalName) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (animalName == 'name 0') {
                reject('No service');
            }
            else {
                const animals = self.getAnimals();
                const animal = animals.find(a => a.name == animalName);
                resolve(animal ? [animal] : []);
            }
        }, 250);
    });
}

AnimalService.prototype.updateAnimal = function (animal) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (animal.name == 'name 0') {
                reject('No service');
            }
            else {
                const animals = self.getAnimals();
                const idx = animals.findIndex(a => a.name == animal.name);
                if (idx === -1) {
                    resolve(false);
                }
                animals[idx] = animal;
                localStorage.setItem('animals', JSON.stringify(animals));
                resolve(true);
            }
        }, 250);
    });
}

AnimalService.prototype.deleteAnimal = function (name) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(function () {
            if (name == 'name 0') {
                reject('No service');
            }
            else {
                const animals = self.getAnimals();
                const idx = animals.findIndex(a => a.name == name);
                if (idx === -1) {
                    resolve(false);
                }
                animals.splice(idx, 1);
                localStorage.setItem('animals', JSON.stringify(animals));
                resolve(true);
            }
        }, 250);
    });
}

export default new AnimalService();