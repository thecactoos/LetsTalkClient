import React from 'react';

// Components
import Spinner from '../../../layout/Spinner/Spinner';
import User from './User/User';

// Styles
import classes from './Users.module.scss';

function Users({ users, isSearching, isTyping, hideHeading }) {
  return (
    <div className={classes.Users}>
      {!hideHeading && <h3 className={classes.Heading}>Users</h3>}
      <ul className={classes.List}>
        {users.length !== 0 &&
          users.map(({ username, _id, avatar50x50 }) => (
            <User key={_id} id={_id} username={username} avatar={avatar50x50} />
          ))}
      </ul>
      {users.length === 0 && !isSearching && !isTyping && (
        <p>There is no user with given username</p>
      )}
      {isSearching ||
        (isTyping && (
          <div className={classes.LoaderWrapper}>
            <Spinner />
          </div>
        ))}
    </div>
  );
}

export default Users;
