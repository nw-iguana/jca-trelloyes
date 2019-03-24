import React from 'react';
import './Card.css';

export default function Card(props) {

  return (
    <div className='Card'>
      <button
        id={props.id}
        type='button'
        onClick={() => {
          let id = props.id;
          props.handleDeleteButton(id);
        }}
      >
        delete
      </button>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
} 
