
var booksApi = 'http://localhost:3000/book'

function start() {
    getBooks(renderTopBooks);
    getBooks(renderBooks);
    henderCreateForm();
}

// chạy ứng dụng
start();

// function
function getBooks(callback) {
    fetch(booksApi)
        .then(response => response.json())
        .then(callback);
}


function createBook(data,callback) {
    var options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header       
    }
    fetch(booksApi,options)
        .then(res => res.json())
        .then(callback)
}

function renderBooks(books) {
    var listBooksBlock = document.querySelector('#book-list');
    var htmls = books.map(book => `
        <div class="col l-3 m-4 c-6">
            <div class="product-item">
                <div class="product__img-bgr"></div>
                <img src="${book.image}" alt="" class="product__image">
                <p class="product__title">${book.title}</p>
                <h4 class="product__author">${book.author}</h4>
                <span class="product__listens">${book.listens} lượt nghe</span>
            </div>
        </div>

    `)
    listBooksBlock.innerHTML = htmls.join('')
}

// render top books
function renderTopBooks(books) {
    var listBooksBlock = document.querySelector('#top-book');
    var htmls = books.map(book => `
            <li class="chart__item">
                <img src="${book.image}" alt="" class="chart__item-image">
                <div class="chart__item-info">
                    <h4 class="chart__item-title">${book.title}</h4>
                    <p class="chart__item-author">${book.author}</p>
                    <div class="chart__item-rating">
                        <span class="chart__item-listens">
                            <i class="fas fa-headphones-alt"></i> 
                            ${book.listens} lượt
                        </span>
                        <span class="chart__item-times">38 phút</span>
                    </div>
                </div>
            </li>

    `)
    listBooksBlock.innerHTML = htmls.join('')
}


function henderCreateForm() {
    var btnCreate = document.querySelector('#create');
    btnCreate.onclick = function(){
        var title = document.querySelector('input[name = "title"]').value;
        var author = document.querySelector('input[name = "author"]').value;
        var image = document.querySelector('input[name = "image"]').value;
        var description = document.querySelector('input[name = "description"]').value;

        var formData = {
            title, author, image, description
        }

        createBook(formData)
    }
}

