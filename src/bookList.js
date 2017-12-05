import React from 'react'
import lodashMap from 'lodash/map'
import './App.css'

const BooksList = ({books, onChangeSelect}) => {
  return (
    <ol className="books-grid">
      { books && books.map(book => {
        let bookUrl = '';
        if (book.imageLinks && book.imageLinks.thumbnail) {
          bookUrl = 'url("'+ book.imageLinks.thumbnail + '")';
        }
        return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bookUrl }}></div>
                <div className="book-shelf-changer">
                  <select onChange={onChangeSelect} data-book={book.id} value={book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <ul className="book-authors">
                {lodashMap(book.authors, (author, index) => (
                  <li key={index} className="book-author">{author}</li>
                ))}
              </ul>
            </div>
          </li>
        );

      })}
    </ol>
  );
}

export default BooksList;
