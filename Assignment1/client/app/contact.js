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
    // draw all the stored messages
    const elements = store.map(drawMessageCard);
    elements.forEach(element => container.appendChild(element));  // Append to container
} else {
    // Draw an error message if no messages are stored
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No messages available.';
    container.appendChild(errorMessage);
}

// get a reference to the form
const formElement = document.getElementById('contact-form');
// attach the event listener
formElement.addEventListener('submit', formSubmitHandler);

/*
 * Handle form submission and store message
 */
function formSubmitHandler(event) {
    // stop the default handler from executing
    event.preventDefault();

    // log out some values
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
    });

    // try to store it
    store.push(message);
    localStorage.setItem('messages', JSON.stringify(store));
}


function drawMessageCard(message) {
    // create a new card element
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    // Add the content to the card
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${message.name}</h5>
            <p class="card-text"><strong>Phone:</strong> ${message.phone}</p>
            <p class="card-text"><strong>Email:</strong> ${message.email}</p>
            <p class="card-text"><strong>Message:</strong> ${message.message}</p>
        </div>
    `;

    return card;
}


function ContactMessage({ name, phone, email, message }) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.message = message;
}
