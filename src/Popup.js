import React, { Component } from 'react';
import './Popup.css'

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2>Short Summary</h2>
          <p>{this.props.text}</p>
        <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup
