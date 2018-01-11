import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
      <Route path='/search' location={this.props.location} component={Search}/>
      <Route exact path='/' location={this.props.location} render={()=> (
        <ListBooks/>
      )}/>
      </div>
    )
  }
}

export default BooksApp
