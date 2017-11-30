import React from 'react';
import {Link} from 'react-router-dom';
import ResultsPage from './resultsPage';
import * as BooksAPI from './BooksAPI';
import MAX_RESULTS from './constants';
import './App.css';

class SearchPage extends React.Component {

  state = {
    results: []
  }

  handleKeyPress = (event) => {
    const query = event.target.value;
    if (query) {
      BooksAPI.search(query, MAX_RESULTS)
      .then(results => this.setState({results}));
    }
  };

  handleChangeSelect = (event) => {
    event.preventDefault();
    const selectTag = event.target;
    const bookId = selectTag.getAttribute('data-book');
    const newShelf = event.target.value;
    BooksAPI.get(bookId)
      .then( book => BooksAPI.update(book, newShelf));
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyPress={this.handleKeyPress}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results &&
              <ResultsPage results={this.state.results} onChangeSelect={this.handleChangeSelect}/>
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
