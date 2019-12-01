function init() {
    loadData();
    if (gBooks.length === 0) createBooks();
    renderBooks();
}


function renderBooks() {
    var books = booksToRender(gBooks);
    var thes = `\t<tr class="table-headings">
    <th>Id</th>
    <th onclick="sortBy(this)" value="name">Title</th>
    <th onclick="sortBy(this)" value="price">Price</th>
    <th>Actions</th>
    </tr>`;
    var strHtml = books.map(function (book) {
        return `<tr>
      \t<td>${book.id}</td> <td>${book.name}</td> <td>${book.price}</td>
      <td><button class="btn btn-dlt" onclick="onDeleteBook(${book.id})">Delete</button></td>
      <td><button class=" btn btn-update" onclick="showUpdateSection(${book.id})">Update</button></td> 
      <td><button class=" btn btn-read" onclick="showBookDetails(${book.id})">Read</button></td>\n
      <tr>\n`;
    })
    document.querySelector('.book-table').innerHTML = thes + strHtml.join('');
}

function sortBy(th){
    changeSortStatus(th.getAttribute("value"));
    console.log(th.getAttribute("value"))
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onAddInputSection() {
    document.querySelector('.input-section').hidden = false;
}

function hideInputSection() {
    document.querySelector('.input-section').hidden = true;
}

function readAndAddNewBook() {
    var title = document.querySelector('#name-input').value;
    var price = document.querySelector('#price-input').value;
    addBook(title, price);
    hideInputSection();
    renderBooks();
}

function readAndUpdateBook(bookId) {
    var newPrice = document.querySelector('#update-price').value;
    updateBook(bookId, newPrice);
    renderBooks();
}

function showUpdateSection(bookId) {
    document.querySelector('.update-section').innerHTML = `Enter a new price <input id="update-price" type="number"> <button onclick="readAndUpdateBook(${bookId})">Update</button>`;
}


function hideUpdateSection() {
    document.querySelector('.update-section').innerHTML = "";
}

function showBookDetails(bookId) {
    var book = findBookById(bookId);
    document.querySelector('.book-details').innerHTML = `<button class="btn-close" onclick="closeModal()">X</button> <img src="${book.imgUrl}">
    Rate<button class="increase-rate" onclick="onIncreaseRate(${book.id})">+</button>
    ${book.rate}
    <button class="decrease-rate" onclick="onDecreaseRate(${book.id})">-</button>
    <h3>${book.name}</h3>
    <h4>${book.price}</h4>`;
    document.querySelector('.book-details').hidden = false;
}

function onIncreaseRate(bookId) {
    increaseRate(bookId);
    renderBooks();
}

function onDecreaseRate(bookId) {
    decreaseRate(bookId);
    renderBooks();
}

function closeModal() {
    document.querySelector('.book-details').hidden = true;
}