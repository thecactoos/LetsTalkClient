import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Components
import UserImg from '../../../../components/UserImg/UserImg';

// Routes
import { CONVERSATION_WITHOUT_ID } from '../../../../consts/routes';

// Style
import classes from './Chat.module.scss';

function Chat({ chatHeading, lastMessage, id, avatar }) {
  const location = useLocation();
  return (
    <li className={classes.ListItem}>
      <Link
        className={classes.Link}
        to={{
          pathname: `${CONVERSATION_WITHOUT_ID}${id}`,
          state: { from: location.pathname },
        }}
      >
        <UserImg avatarUrl={avatar} />
        <div className={classes.InfoBox}>
          <p className={classes.ChatHeading}>{chatHeading}</p>
          <p className={classes.LastMessage}>{lastMessage}</p>
        </div>
      </Link>
    </li>
  );
}

export default React.memo(Chat);
