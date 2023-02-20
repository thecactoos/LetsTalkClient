import React from 'react';

// Styles
import classes from './Button.module.scss';

const Button = ({ children }) => {
  return (
    <button type="submit" className={classes.Button}>
      {children}
    </button>
  );
};

export default Button;
