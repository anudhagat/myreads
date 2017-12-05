import React from 'react';
import { Route } from 'react-router-dom';
import groupBy from 'lodash/groupBy';
import SearchPage from './search';
import BooksPage from './booksPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(groupBy(books, 'shelf'));
    });
  }

  componentDidUpdate() {
    BooksAPI.getAll().then(books => {
      this.setState(groupBy(books, 'shelf'));
    });
  }

  handleSelectChange = event => {
    event.preventDefault();
    const selectTag = event.target;
    const bookId = selectTag.getAttribute('data-book');
    const newShelf = event.target.value;
    BooksAPI.get(bookId).then(book => {
      const prevShelf = book.shelf;
      this.setState({
        [prevShelf]: this.state[prevShelf].filter(el => el.id !== book),
        [newShelf]: this.state[newShelf]
      });
      BooksAPI.update(book, newShelf);
    });
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchPage
              reading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <BooksPage
              reading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              onChangeSelect={this.handleSelectChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
