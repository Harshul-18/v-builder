// Progress.js
import React from 'react';
import './styles.css';

export const Progress = ({ value }) => (
  <div className="progress-bar">
    <div className="progress-bar-fill" style={{ width: `${value}%` }}></div>
  </div>
);

export default Progress;
