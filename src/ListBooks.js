import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI';
import history from './history';

class ListBooks extends Component {
  constructor(){
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount(){
    BooksAPI.getAll().then((list)=> {
      this.setState({list})
    })
  }

  updateBook(book, shelf){
    var that = this;
    BooksAPI.update(book, shelf).then((list)=>{
      var oldList = that.state.list;
      var newList = [];
      for (var i=0; i<oldList.length; i++){
        if (oldList[i].id !== book.id){
          newList.push(oldList[i])
        }
      };
      book.shelf = shelf
      newList.push(book);
      that.setState({list: newList});
    })
  }

  handleClick(e){
    e.preventDefault();
    history.push('/search', {
      BooksOnShelf: this.state.list
    })
  }



  render(){
    var that = this;
    //clearing shelf and categorizing
    var shelf = {
      read: [],
      wantToRead: [],
      currentlyReading: []
    }
    for (var i=0; i<that.state.list.length; i++){
        if (that.state.list[i].shelf === "read"){
          shelf.read.push(that.state.list[i]);
        }
        if (that.state.list[i].shelf === "wantToRead"){
          shelf.wantToRead.push(that.state.list[i]);
        }
        if (that.state.list[i].shelf === "currentlyReading"){
          shelf.currentlyReading.push(that.state.list[i]);
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
                    shelf.currentlyReading.map( (book, index) => (
                      <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={index} update={(e)=> that.updateBook(book, e)}/>
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
                      shelf.wantToRead.map( (book, index) => (
                        <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={index} update={(e)=> that.updateBook(book, e)}/>
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
                      shelf.read.map( (book, index) => (
                        <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={index} update={(e)=> that.updateBook(book, e)}/>
                      ))
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to={{pathname: '/search'}} onClick={(e)=> that.handleClick(e)}>Add a book</Link>
          </div>
        </div>
      </div>
  )
  }
}

export default ListBooks
