import React from 'react'
import {Route} from 'react-router-dom'
import groupBy from 'lodash/groupBy'
import SearchPage from './search'
import BooksPage from './booksPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // console.log('books: ', books);
       console.log('group by: ', groupBy(books, 'shelf'));
      this.setState(groupBy(books, 'shelf'));
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={SearchPage} />
        <Route exact path='/' render={() => (
          <BooksPage
            reading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
          />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
