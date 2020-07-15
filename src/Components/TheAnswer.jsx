import React from 'react';

const TheAnswer = (props) => {
  return (
    <div>
      <div className="theAnswer">
        <h3>{props.answer}</h3>
      </div>
    </div>
  );
};

export default TheAnswer;