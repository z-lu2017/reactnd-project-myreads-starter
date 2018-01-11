import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      query: ""
    };
  }

  updateBook(book, shelf){
    BooksAPI.update(book, shelf).then((list)=>{
      alert("successfully added the book to shelf!")
    })
  }

  updateQuery = (query) => {
    var showingBook = [];
    var that = this;
    if (query) {
      BooksAPI.search(query.trim()).then((resp)=>{
        if(resp.length >0){
          showingBook = resp;
          var verifiedBooks = showingBook.map(book => {
            that.props.history.location.state.BooksOnShelf.forEach(bookOnShelf => {
              // check wether book is already on shelf
              if (book.id === bookOnShelf.id) {
                // if yes get the shelf data from BooksOnShelf
                book.shelf = bookOnShelf.shelf;
              }
            });
          });
          that.setState({
            query: query,
            list: showingBook
          })
        }
        else{
          that.setState({
            query: "",
            list: []
          })
        }
      })
    }
    else{
      that.setState({
        query: "",
        list: []
      })
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }


  render(){
    const { query } = this.state
    var that = this
    if (that.state.list.length>0){
      that.state.list.sort(sortBy('title'));
    }
    //cleaning the list, if there's no pic, use placeholder
    for (var i=0; i<that.state.list.length; i++){
      if (!that.state.list[i].imageLinks){
        that.state.list[i].imageLinks = {
          smallThumbnail: "http://via.placeholder.com/128x193"
        }
      }
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {that.state.list.map((book, index) => (
            <Book book={book} authors={book.authors} link={book.imageLinks.smallThumbnail} title={book.title} shelf={book.shelf} key={index} update={(e)=> that.updateBook(book, e)}/>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
