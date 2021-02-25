import React from "react";
import classes from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Inner}>
        <div className={classes.Circle}>&nbsp;</div>
        <div className={classes.Circle}>&nbsp;</div>
      </div>
    </div>
  );
};

export default Spinner;
