import React from 'react';
import addLeadingZeros from '../lib/addLeadingZeros';

const Calculator = ({ initialNumber = 0 }) => {
  return <div>{addLeadingZeros(initialNumber, 5)}</div>;
};

export default Calculator;
