import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Routes
import { HOME } from '../../consts/routes';

// Assets
import { ReactComponent as BackArrow } from '../../assets/arrow-left.svg';

// Styles
import classes from './BackLink.module.scss';

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
