import React from 'react';

// Components
import { ReactComponent as IconDelete } from '../../../assets/x.svg';
import UserImg from '../../../components/UserImg/UserImg';

// Styles
import classes from './Receiver.module.scss';

const Receiver = React.memo(({ username, handleChange, avatar }) => {
  return (
    <div className={classes.Receiver}>
      <UserImg avatarUrl={avatar} small />
      <label className={classes.Username} htmlFor={username}>
        {username}
      </label>
      <button
        className={classes.RemoveBtn}
        onClick={handleChange}
        type="button"
      >
        <IconDelete className={classes.RemoveBtnIcon} />
      </button>
      <input
        type="checkbox"
        onChange={handleChange}
        className={classes.ReceiverInput}
      />
    </div>
  );
});

export default Receiver;
