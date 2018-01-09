import React, { Component } from 'react';
import Popup from './Popup'
import ScrollLock from 'react-scrolllock';

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
    return(
      <div className="Book">
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" onClick={this.toggleModal.bind(this)} style={{ width: 128, height: 193, backgroundImage: `url(${this.props.link})`}}></div>
              <div className="book-shelf-changer">
                <select defaultValue='none' onChange={(e) => this.props.update(e.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
              {this.state.isVisible ?
                <Popup
                  text={this.props.book.description}
                  closePopup={this.toggleModal.bind(this)}
                />
                : null
              }
              {this.state.isVisible ?
                <ScrollLock />
                : null
              }
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
