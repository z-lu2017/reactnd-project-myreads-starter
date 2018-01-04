import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      shelf: {
        read: [],
        currentlyReading: [],
        wantToRead: []
      }
    };
  }

  static propTypes = {
    list: PropTypes.array.isRequired
  }

  updateBook(book, shelf){
    console.log("triggered, what is book", book)
    BooksAPI.update().then((list)=>{
      this.setState({list})
    })
  }

  render(){
    var list = this.props.list;
    //categorizing
    for (var i=0; i<list.length; i++){
        if (list[i].shelf === "read"){
          this.state.shelf.read.push(list[i]);
        }
        if (list[i].shelf === "wantToRead"){
          this.state.shelf.wantToRead.push(list[i]);
        }
        if (list[i].shelf === "currentlyReading"){
          this.state.shelf.currentlyReading.push(list[i]);
        }
    }
    //rendering
    return (
      <div className="shelf">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {
                    this.state.shelf.currentlyReading.map(book => (
                      <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={book.title} update={(book)=> this.updateBook(book, book.shelf)}/>
                    ))
                  }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      this.state.shelf.wantToRead.map(book => (
                        <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={book.title} update={(book)=> this.updateBook(book, book.shelf)}/>
                      ))
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      this.state.shelf.read.map(book => (
                        <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={book.title} update={(book)=> this.updateBook(book, book.shelf)}/>
                      ))
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
  )
  }
}

export default ListBooks
