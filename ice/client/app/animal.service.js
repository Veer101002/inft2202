export default new AnimalService({
    host: 'https://inft2202-server.onrender.com/',
    user: '100951963'
});

function AnimalService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        user
    });
}

AnimalService.prototype.findAnimal = async function(name) {
    try {
        const res = await fetch(new URL(`/api/animals/${name}`, this.host), {
            headers: this.headers,
            method: 'GET',
        });
        if (!res.ok) throw new Error(res.statusText);
        return await res.json();
    } catch (err) {
        console.error('findAnimal failed:', err);
        throw err;
    }
};

AnimalService.prototype.getAnimalPage = async function({ page = 1, perPage = 20 }) {
    try {
        const params = new URLSearchParams({ page, perPage });
        const res = await fetch(new URL(`/api/animals?${params}`, this.host), {
            headers: this.headers,
            method: 'GET',
        });
        if (!res.ok) throw new Error(res.statusText);
        return await res.json();
    } catch (err) {
        console.error('getAnimalPage failed:', err);
        throw err;
    }
};
/*
 *
 */
AnimalService.prototype.saveAnimal = async function(animals) {
    const url = new URL(`/api/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(animals)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

/*
 *
 */
AnimalService.prototype.updateAnimal = async function(animal) {
    const url = new URL(`/api/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'PUT',
        body: JSON.stringify(animal)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

/*
 *
 */
AnimalService.prototype.deleteAnimal = async function(name) {
    const url = new URL(`/api/animals/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'DELETE',
    });
    try {
        const res = await fetch(req);
        if (res.status === 204) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}