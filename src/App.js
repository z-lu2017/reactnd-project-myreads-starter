import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    list : []
  }

  componentDidMount(){
    BooksAPI.getAll().then((list)=> {
      this.setState({list})
    })
  }

  render() {
    return (
      <div className="app">
      <Route path='/search' render={() => (
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
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      <Route exact path='/' render={()=> (
        <ListBooks list={this.state.list}/>
      )}/>
      </div>
    )
  }
}

export default BooksApp
