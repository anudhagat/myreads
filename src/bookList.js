import React from 'react'
import lodashMap from 'lodash/map'
import './App.css'

const BooksList = (props) => {
  const {books} = props;

  return (
    <ol className="books-grid">
      {books.map(book => {
        const bookUrl = 'url("'+ book.imageLinks.thumbnail + '")'
        return (
          <li key={book.title+book.author}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bookUrl }}></div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {lodashMap(book.authors, author => (<div>{author}</div>))}
              </div>
            </div>
          </li>
        )

      })}
    </ol>
  )
}

export default BooksList
