/*
    Name: Virendrasinh Chauhan
    filename: add.js
    Course: INFT 2202
    Date: January 13, 2025
    Description: This is create.js page.
*/

// tell us what page we're on
console.log('we are on the add page');

// assign a handler to the submit event
document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

// create a handler to deal with the submit event
async function submitAnimalForm ( event ) {
    // prevent the default action from happening
    event.preventDefault();
    // get a reference to the form (from the event)
    const animalForm = event.target;  
    // validate the form
    const valid = validateAnimalForm(animalForm);
    // do stuff if the form is valid
    if (valid) {
        console.log('were good');
        
        const formData = new FormData(animalForm);
        //create a javascript object to hold the form data
        const animalObject = {};
        formData.forEach((value, key) => {
            //by default, a value from form is string
            //we need to convert them accordingly
            if(key === 'eyes' || key ==='legs'){
                animalObject[key] = Number(value);
            }
            else{
                animalObject[key] = value;
            }
        });

        const eleNameError = animalForm.name.nextElementSibling
        try {
            await animalService.saveAnimal(animalObject)
            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }        
    // do nothing if it's not
    } else {
        console.log('were not good');
    }
}

// validate the animal form
function validateAnimalForm ( form ) {
    console.log('validating')
    let valid = true;
    // test that name is valid
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling
    if (name == "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }
    // add validation for the remaining fields. 

    // return if the form is valid or not
    return valid
}