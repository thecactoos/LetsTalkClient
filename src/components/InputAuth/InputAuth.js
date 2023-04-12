import React from 'react';

// Styles
import classes from './InputAuth.module.scss';

const Input = ({ value, isValid, type, changed, name, labelText, ref }) => {
  return (
    <div className={classes.InputBox}>
      <input
        ref={ref}
        className={
          isValid ? `${classes.Input} ${classes.InputValid}` : classes.Input
        }
        type={type}
        onChange={changed}
        id={name}
        value={value}
        name={name}
        required
      />
      <label
        className={
          value.length !== 0
            ? `${classes.Label} ${classes.LabelActive}`
            : classes.Label
        }
        htmlFor={name}
      >
        {labelText}
      </label>
    </div>
  );
};

export default Input;
