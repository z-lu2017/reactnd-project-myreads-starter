import React, { Component } from 'react';
import './Popup.css'

const Popup = function(props) {
  return (
    <div className='popup'>
      <div className='popup_inner'>
        <h2>Short Summary</h2>
        <p>{props.text}</p>
      <button onClick={props.closePopup}>Close</button>
      </div>
    </div>
  );
};

export default Popup
