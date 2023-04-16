import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Components
import UserImg from '../../../../components/UserImg/UserImg';

// Routes
import { PROFILE_USER_WITHOUT_ID } from '../../../../consts/routes';

// Styles
import classes from './User.module.scss';

// Add avatar
function User({ id, username, avatar }) {
  const location = useLocation();
  return (
    <li className={classes.User}>
      <Link
        to={{
          pathname: `${PROFILE_USER_WITHOUT_ID}${id}`,
          state: { from: location.pathname },
        }}
        className={classes.Link}
      >
        <UserImg avatarUrl={avatar} />
        <span className={classes.Username}>{username}</span>
      </Link>
    </li>
  );
}

export default User;
