import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

/**
 * @constructor
 * @description Search page used to add books to different shelves
 */
class SearchBooks extends Component {
   static propTypes = {
      history: PropTypes.object.isRequired,
      handleShelfChange: PropTypes.func.isRequired,
      libraryBooks: PropTypes.array.isRequired,
   }

   state = {
      books: [],
      query: "",
   }

   refreshBooks(query) {
      if (query) {
         BooksAPI.search(query).then((books) => {
            // Check books.length to determine if response is an array of books or not, resp may not be an array
            // when query is out of set of search terms
            if (books && books.length) {               
               this.setState({ books });
            } else {
               this.setState({books: [] })
            }
         });
      } else {
         this.setState({books: [] })
      }
      this.setState({ query });
   }

   updateQuery = (e) => {
      let query = e.target.value;
      this.refreshBooks(query);
   }

   static getDerivedStateFromProps(props, state) {
      const books = state.books;
      if (books && books.length) {
         books.forEach(book => {
            // Get book if exists in library to update shelf
            let libraryBook = props.libraryBooks.filter((libraryBook) => book.id === libraryBook.id)[0];
            if (libraryBook) {
               book.shelf = libraryBook.shelf;
            }
         });
      }
      return { books };
   }

   render() {
      return (
         <div className="search-books">
            <div className="search-books-bar">
               <button className="close-search" onClick={() => this.props.history.push("/")}>Close</button>
               <div className="search-books-input-wrapper">
                  {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <input type="text" placeholder="Search by title or author" onChange={this.updateQuery} value={this.state.query} />

               </div>
            </div>
            <div className="search-books-results">
               <ol className="books-grid">
                  {this.state.books && this.state.books.map((book) => (
                     <Book key={book.id} book={book} handleShelfChange={this.props.handleShelfChange} />
                  ))}
               </ol>
            </div>
         </div>
      );
   }
}

export default SearchBooks;