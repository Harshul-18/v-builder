// Card.js
import React from 'react';
import './styles.css';

export const Card = ({ children, className }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => <div className="card-header">{children}</div>;

export const CardTitle = ({ children }) => <h2 className="card-title">{children}</h2>;

export const CardContent = ({ children }) => <div className="card-content">{children}</div>;

export default Card;
