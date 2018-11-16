//SOME COMMENT HERE
import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

const BooksApp = function(props) {
  return (
    <div className="app">
    <Route path='/search' location={props.location} component={Search}/>
    <Route exact path='/' location={props.location} render={()=> (
      <ListBooks/>
    )}/>
    </div>
  )
};

export default BooksApp
