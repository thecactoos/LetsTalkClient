import React from "react";
import { Link, useLocation } from "react-router-dom";

import { HOME } from "../../consts/routes";
import classes from "./BackToNav.module.scss";
import { ReactComponent as BackArrow } from "../../assets/arrow-left.svg";

function BackToNav() {
  const location = useLocation();

  return (
    <Link
      className={classes.BackToNavLink}
      to={{
        pathname: location?.state?.from || HOME,
      }}
    >
      <BackArrow className={classes.BackToNavIcon} />
    </Link>
  );
}

export default BackToNav;
