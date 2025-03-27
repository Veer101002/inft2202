// make sure storage is set up for messages
if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
}
const store = JSON.parse(localStorage.getItem('messages'));

/*
 *  If storage has items, draw them.
 *  Otherwise, display an error
 */
const container = document.getElementById('message-container');
if (store.length) {
    const elements = store.map(drawMessageCard);
    console.log(elements)
    return elements;
} else {
    // draw error message
}

// get a reference to the form
const formElement = document.getElementById('contact-form');
// attach the event listener
formElement.addEventListener('submit', formSubmitHandler);

/*
 *
 */
function formSubmitHandler (event) {
    // stop the default handler from executing
    event.preventDefault();

    // log out some valuesx
    console.log(`name: ${event.target.name.value}`);
    console.log(`phone: ${event.target.phone.value}`);
    console.log(`email: ${event.target.email.value}`);
    console.log(`message: ${event.target.message.value}`);

    // create a new ContactMessage
    const message = new ContactMessage({
        name: event.target.name.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        message: event.target.message.value,
    })

    // try to store it
    store.push(message);
    localStorage.setItem('messages', JSON.stringify(store));l
}

/*
 *  @param ContactMessage
 *  @return Element
 */
function drawMessageCard (message) {
    // create a new card element
    const card = document.createElement('div');
    console.log(message.description);


    return card;
}

/*
 *  @param ContactMessageParams
 *  @return ContactMessage
 */
function ContactMessage({ name, phone, email, message }) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.message = message;
}
