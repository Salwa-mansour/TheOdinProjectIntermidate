const myLibrary = [];
const formContainer = document.querySelector('.form-container');
const form1 = formContainer.querySelector('.form1');
const booksContainer = formContainer.querySelector('.books table tbody')

function Book(title,author,pages,read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  // do stuff here
  e.preventDefault();
 let book = new Book(
    e.target.querySelector('input[name="book-name"]').value,
    e.target.querySelector('input[name="author"]').value,
    e.target.querySelector('input[name="pages-number"]').value,
    e.target.querySelector('input[name="done-reading"]').checked,
 );

 myLibrary.push(book);
 populateBooks(booksContainer,myLibrary)

}

function populateBooks(bookList,books){

  bookList.innerHTML = books.map((book,i)=>{
    return`
     <tr data-index="${i}" >
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><input type="checkbox" ${book.read ? "checked":""} ></td>
        <td><button >delete</button></td>
    </tr>
    `;
  }).join("");

}
form1.addEventListener('submit',addBookToLibrary);