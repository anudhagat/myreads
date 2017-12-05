import React from 'react';
import BooksList from './bookList';
import './App.css';

const ResultsPage = ({ results, onChangeSelect }) => {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Search Results</h2>
            <div className="bookshelf-books">
              <BooksList books={results} onChangeSelect={onChangeSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultsPage;
