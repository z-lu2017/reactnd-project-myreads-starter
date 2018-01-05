import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Book extends Component {
  constructor(props){
    super(props);
    this.state = {
      link: "",
      title: "",
      authors: [],
      shelf: "",
      book: {}
      }
    };

  static propTypes = {
    authors: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired
  }


  render(){
    return(
      <div className="Book">
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.link})`}}></div>
              <div className="book-shelf-changer">
                <select defaultValue='none' onChange={(e) => this.props.update(e.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors}</div>
          </div>
        </li>
      </div>
    )
  }
}

export default Book
