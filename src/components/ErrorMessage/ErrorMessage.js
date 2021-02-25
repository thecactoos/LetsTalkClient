import React from "react";
import { ReactComponent as ErrorIcon } from "./error.svg";

import classes from "./ErrorMessage.module.scss";

const ErrorMessage = ({ msg }) => {
  return (
    <div>
      <p className={`${classes.Box}`}>
        <ErrorIcon className={classes.Icon} />
        <span className={classes.Message}>{msg}</span>
      </p>
    </div>
  );
};

export default ErrorMessage;
