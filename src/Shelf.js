import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * @constructor
 * @description Represents a Book Shelf
 */
class Shelf extends Component {

   static propTypes = {
      title: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
      handleShelfChange: PropTypes.func.isRequired,
   }

   render() {
      return (
         <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
               <ol className="books-grid">
                  {this.props.books && this.props.books.length !== 0 && (this.props.books.map((book) => (
                     <li key={book.id}>
                        <Book book={book} handleShelfChange={this.props.handleShelfChange}/>
                     </li>
                  )))}
               </ol>
            </div>
         </div>
      );
   }
}

export default Shelf;