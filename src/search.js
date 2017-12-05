import React from 'react';
import { Link } from 'react-router-dom';
import ResultsPage from './resultsPage';
import lodashFind from 'lodash/find';
import lodashMap from 'lodash/map';
import debounce from 'lodash/debounce';
import * as BooksAPI from './BooksAPI';
import MAX_RESULTS from './constants';
import './App.css';

class SearchPage extends React.Component {
  state = {
    results: []
  };

  debouncedHandleKeyPress = debounce(event => {
    const query = event.target.value;
    if (query) {
      BooksAPI.search(query, MAX_RESULTS).then(results => {
        const addShelves = this.updateResults(results);
        this.setState({ results: addShelves });
      });
    }
  }, 400);

  handleKeyPress = event => {
    event.persist();
    this.debouncedHandleKeyPress(event);
  };

  handleChangeSelect = event => {
    event.preventDefault();
    const selectTag = event.target;
    const bookId = selectTag.getAttribute('data-book');
    const newShelf = event.target.value;
    BooksAPI.get(bookId)
      .then(book => {
        BooksAPI.update(book, newShelf);
        this.setState({results: this.updateShelf(book, newShelf)});
      });

  };

  updateShelf = (thisBook, shelf) => {
    return lodashMap(this.state.results, book => {
      if (book.id === thisBook.id) {
        book.shelf = shelf;
      }
      return book;
    });
  }

  updateResults = results => {
    const { currentlyReading, wantToRead, read } = this.props;

    return lodashMap(results, book => {
      let newBook = { ...book };
      if (lodashFind(currentlyReading, b => b.id === book.id)) {
        newBook.shelf = 'currentlyReading';
      } else if (lodashFind(read, b => b.id === book.id)) {
        newBook.shelf = 'read';
      } else if (lodashFind(wantToRead, b => b.id === book.id)) {
        newBook.shelf = 'wantToRead';
      } else {
        newBook.shelf = 'none';
      }
      return newBook;
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results && (
              <ResultsPage
                results={this.state.results}
                onChangeSelect={this.handleChangeSelect}
              />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
