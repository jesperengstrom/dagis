import React from 'react';

const Button = ({onClick, name}) => {
  return (
    <button className="mr-2" onClick={onClick}>{name}</button>
  );
}


export default Button;