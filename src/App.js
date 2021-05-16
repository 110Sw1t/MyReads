import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import SearchBooks from './SearchBooks'

export const SHELF = {
  [BooksAPI.BOOK_SHELF.CURRENTLY_READING]: "Currently Reading",
  [BooksAPI.BOOK_SHELF.WANT_TO_READ]: "Want to Read",
  [BooksAPI.BOOK_SHELF.READ]: "Read",
  [BooksAPI.BOOK_SHELF.NONE]: "None",
}

class BooksApp extends React.Component {

  state = {
    books: [],
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((shelves) => {      
      this.setState((oldState) => {
        const books = oldState.books;
        // Insert book if it didn't exist before in App state
        let bookFromState = books.filter(bookFromState => bookFromState.id === book.id)[0];
        if (!bookFromState) {
          books.push(book);
        }
        // Update shelf for all books from BooksAPI.update response
        books.forEach(book => {
          let bookCurrentShelf = BooksAPI.BOOK_SHELF.NONE;
          Object.keys(shelves).forEach(shelf => {
            if (shelf && shelves[shelf] && shelves[shelf].length !== 0 && shelves[shelf].includes(book.id)) {
              bookCurrentShelf = shelf;
            }
          })
          book.shelf = bookCurrentShelf;
        });
        return oldState;
      })
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  render() {
    return (

      <div className="app">
        <Route exact path="/search" render={({ history }) => (
          <SearchBooks history={history} handleShelfChange={this.handleShelfChange} libraryBooks={this.state.books}/>
        )} />
        <Route exact path="/" render={(({ history }) => (
          <Library history={history} handleShelfChange={this.handleShelfChange} libraryBooks={this.state.books} />
        ))} />
      </div>
    )
  }
}

export default BooksApp;
