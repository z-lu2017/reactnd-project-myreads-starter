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
    console.log("triggering")
    BooksAPI.update(book, shelf).then((list)=>{
      this.setState({list: list})
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({list: nextProps.list})
  }

  render(){
    var that = this;
    //categorizing
    for (var i=0; i<that.state.list.length; i++){
        if (that.state.list[i].shelf === "read"){
          that.state.shelf.read.push(that.state.list[i]);
        }
        if (that.state.list[i].shelf === "wantToRead"){
          that.state.shelf.wantToRead.push(that.state.list[i]);
        }
        if (that.state.list[i].shelf === "currentlyReading"){
          that.state.shelf.currentlyReading.push(that.state.list[i]);
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
                    this.state.shelf.currentlyReading.map( (book, index) => (
                      <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={index} update={()=> that.updateBook(book, book.shelf)}/>
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
                      this.state.shelf.wantToRead.map( (book, index) => (
                        <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={index} update={()=> that.updateBook(book, book.shelf)}/>
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
                      this.state.shelf.read.map( (book, index) => (
                        <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={index} update={()=> that.updateBook(book, book.shelf)}/>
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
