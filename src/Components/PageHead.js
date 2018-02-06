import React from 'react';

const PageHead = ({children, name}) => {
  return (
    <div className="flex flex-row align-center">
      <h1 className="mr-2">{name}</h1>
      {children}
    </div>
  );
}


export default PageHead;