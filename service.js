var gBooks = [], gNextID = 1, gSortStatus;


function createBook(name, price) {
    var book = {
        id: gNextID++,
        name: name,
        price: price,
        rate: 0,
        imgUrl: null
    };
    return book;
}

function createBooks() {
    gBooks.push(createBook('Harry Potter', 80));
}

function booksToRender() {
    return sorting(gBooks);
}

function deleteBook(bookId) {
    var indexDlt = findBookIndexByID(bookId);
    gBooks.splice(indexDlt, 1);
    saveData();
}

function findBookIndexByID(bookId) {
    return gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
}

function findBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId;
    })
}

function addBook(title, price) {
    gBooks.push(createBook(title, price));
    saveData();
}


function updateBook(bookId, bookPrice) {
    var book = findBookById(bookId);
    book.price = bookPrice;
}

function increaseRate(bookId) {
    var book = findBookById(bookId);
    book.rate++;
    saveData();
}

function decreaseRate(bookId) {
    var book = findBookById(bookId);
    book.rate--;
    saveData();
}

function saveData() {
    saveToStorage('data-books', gBooks);
}

function loadData() {
    gBooks = loadFromStorage('data-books', []);
}

function changeSortStatus(sortStatus) {
    gSortStatus = sortStatus;
}

function sorting(books) {
    return books.sort(function (a, b) {
        a[gSortStatus] - b[gSortStatus] > 0 ? 1 : a[gSortStatus] - b[gSortStatus] < 0 ? -1 : 0;
    })
}