const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const library = document.getElementById('library');
    library.innerHTML = ''; // Clear the display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');

        const bookInfo = document.createElement('p');
        bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'Read' : 'Not Read'}`;
        bookCard.appendChild(bookInfo);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('removeBtn');
        removeBtn.setAttribute('data-index', index);
        removeBtn.onclick = function() {
            removeBook(index);
        };
        bookCard.appendChild(removeBtn);

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Toggle Read Status';
        toggleReadBtn.classList.add('toggleReadBtn');
        toggleReadBtn.setAttribute('data-index', index);
        toggleReadBtn.onclick = function() {
            toggleReadStatus(index);
        };
        bookCard.appendChild(toggleReadBtn);

        library.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

document.getElementById('newBookBtn').onclick = function() {
    const form = document.getElementById('bookForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('bookForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent form from submitting

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Clear the form and hide it
    document.getElementById('bookForm').reset();
    document.getElementById('bookForm').style.display = 'none';
};

// Add some sample books to demonstrate
addBookToLibrary(new Book('To Kill a Mockingbird', 'Harper Lee', 324, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
addBookToLibrary(new Book('Moby Dick', 'Herman Melville', 635, false));
