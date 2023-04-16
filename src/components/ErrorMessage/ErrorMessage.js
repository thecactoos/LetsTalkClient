import React from 'react';

// Assets
import { ReactComponent as ErrorIcon } from './error.svg';

// Styles
import classes from './ErrorMessage.module.scss';

const ErrorMessage = ({ msg }) => {
  return (
    <div>
      <p className={classes.Box}>
        <ErrorIcon className={classes.Icon} />
        <span className={classes.Message}>{msg}</span>
      </p>
    </div>
  );
};

export default ErrorMessage;
