import React from "react";
import { Link, useLocation } from "react-router-dom";

// Components
import UserImg from "../../../components/UserImg/UserImg";

// Assets
import { ReactComponent as Tick } from "../../../assets/tick.svg";
import { ReactComponent as LoupeView } from "../../../assets/view.svg";

// Routes
import { PROFILE_USER_WITHOUT_ID } from "../../../consts/routes";

// Styles
import classes from "./SearchReceiversItem.module.scss";

function Receiver({ username, id, isReceiver, handleChange, avatar }) {
  const location = useLocation();
  return (
    <div className={classes.Receiver}>
      <label htmlFor={id} className={classes.Label}>
        <div className={classes.AvatarWrapper}>
          <UserImg avatarUrl={avatar} />
        </div>
        {isReceiver && (
          <div className={classes.TickWrapper}>
            <Tick className={classes.TickIcon} />
          </div>
        )}
        <input
          className={classes.Input}
          type="checkbox"
          onChange={handleChange}
          checked={isReceiver}
          id={id}
        />
        <span className={classes.Username}>{username}</span>
      </label>
      <Link
        to={{
          pathname: `${PROFILE_USER_WITHOUT_ID}${id}`,
          state: { from: location.pathname },
        }}
        className={classes.ViewProfileLink}
      >
        <LoupeView className={classes.ViewProfileIcon} />
      </Link>
    </div>
  );
}

export default React.memo(Receiver);
