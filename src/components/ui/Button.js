// Button.js
import React from 'react';
import './styles.css';

export const Button = ({ children, onClick, variant = 'default', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`button ${variant === 'default' ? 'button-default' : variant === 'destructive' ? 'button-destructive' : 'button-secondary'}`}
  >
    {children}
  </button>
);

export default Button;
