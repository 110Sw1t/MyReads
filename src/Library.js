import React, { Component } from 'react';
import { SHELF } from './App';
import './App.css';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';

/**
 * @constructor
 * @description Represent a library containing book shelves
 */
class Library extends Component {

   static propTypes = {
      history: PropTypes.object.isRequired,
      handleShelfChange: PropTypes.func.isRequired,
      libraryBooks: PropTypes.array.isRequired,
   }

   render() {
      return (
         <div className="list-books">
            <div className="list-books-title">
               <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
               <div>
                  {Object.keys(BooksAPI.BOOK_SHELF).filter(status => BooksAPI.BOOK_SHELF[status] !== BooksAPI.BOOK_SHELF.NONE).map(status => {
                     let statusValue = BooksAPI.BOOK_SHELF[status];
                     let shelf = SHELF[statusValue];
                     return (shelf && <Shelf key={shelf} title={shelf} books={this.props.libraryBooks.filter(book => book.shelf === statusValue)} handleShelfChange={this.props.handleShelfChange} />)
                  })}
               </div>
            </div>
            <div className="open-search">
               <button onClick={() => this.props.history.push("/search")}>Add a book</button>
            </div>
         </div>
      
      );
   }

}

export default Library;