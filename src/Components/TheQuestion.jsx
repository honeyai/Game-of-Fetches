import React from 'react';

const TheQuestion = (props) => {
  return (
    <div className="theQuestion">
      <h2>{props.question}</h2>
    </div>
  );
};

export default TheQuestion;