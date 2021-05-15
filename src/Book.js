import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { READ_STATUS } from './BooksAPI';
import { SHELF } from './App';
/**
 * @constructor
 * @description Represents a book
 */
class Book extends Component {
   static propTypes = {
      book: PropTypes.object.isRequired,
      shelves: PropTypes.object.isRequired,
   }

   render() {
      return (
         (this.props.book && (<div className="book">
            <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
               <div className="book-shelf-changer">
                  <select value={this.props.book.shelf}>
                     <option value="move" disabled>Move to...</option>
                     {Object.keys(READ_STATUS).map(status => {
                        let statusValue = READ_STATUS[status];
                        return <option value={statusValue}>{SHELF[statusValue]}</option>
                     })}
                  </select>
               </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            {this.props.book.authors && (this.props.book.authors.map((author => (
               <div className="book-authors">{author}</div>
            ))))}

         </div>))
      );
   }
}

export default Book;