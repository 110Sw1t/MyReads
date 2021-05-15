import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BOOK_SHELF } from './BooksAPI';
import { SHELF } from './App';
/**
 * @constructor
 * @description Represents a book
 */
class Book extends Component {
   static propTypes = {
      book: PropTypes.object.isRequired,
      handleShelfChange: PropTypes.func.isRequired,
   }

   changeShelf = (e) => {
      this.props.handleShelfChange(this.props.book, e.target.value);
   }

   render() {
      return (
         (this.props.book && (<div className="book">
            <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
               <div className="book-shelf-changer">
                  <select value={this.props.book.shelf} onChange={this.changeShelf}>
                     <option value="move" disabled>Move to...</option>
                     {Object.keys(BOOK_SHELF).map(status => {
                        let statusValue = BOOK_SHELF[status];
                        return <option key={statusValue} value={statusValue}>{SHELF[statusValue]}</option>
                     })}
                  </select>
               </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            {this.props.book.authors && (this.props.book.authors.map((author => (
               <div key={author} className="book-authors">{author}</div>
            ))))}

         </div>))
      );
   }
}

export default Book;