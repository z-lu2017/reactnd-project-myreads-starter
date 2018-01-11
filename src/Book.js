import React, { Component } from 'react';
import Popup from './Popup';
import ScrollLock from 'react-scrolllock';
import { If, Then, Else } from 'react-if';;

class Book extends Component {
  constructor(props){
    super(props);
    this.state = {
      isVisible: false
      }
    };

    toggleModal = () => {
      this.setState({
        isVisible: !this.state.isVisible
      });
    }

  render(){
    //check if book has an image, if not use placeholder
    if (!this.props.book.imageLinks.smallThumbnail){
      this.props.book.imageLinks.smallThumbnail = "http://via.placeholder.com/128x193";
    }
    return(
      <div className="Book">
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" onClick={this.toggleModal.bind(this)} style={{ width: 128, height: 193, backgroundImage: `url(${this.props.link})`}}></div>
              <div className="book-shelf-changer">
                <select value={this.props.shelf || 'none'} onChange={(e) => this.props.update(e.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
              <If condition={ this.state.isVisible === true }>
                   <Then>
                     <Popup text={this.props.book.description} closePopup={this.toggleModal.bind(this)}/>
                  </Then>
               </If>
               <If condition={ this.state.isVisible === true }>
                    <Then>
                       <ScrollLock />
                   </Then>
                </If>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">
              {this.props.authors ? this.props.authors.join(', ') : ''}
            </div>
          </div>
        </li>
      </div>
    )
  }
}

export default Book
