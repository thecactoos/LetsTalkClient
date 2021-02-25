import React from "react";
import { useSelector } from "react-redux";

// Assets
import { ReactComponent as Plane } from "../../../assets/paper-plane.svg";
import UserImg from "../../UserImg/UserImg";

// Style
import classes from "./Message.module.scss";

function Message({ content, senderId, isSending, avatar }) {
  const userId = useSelector((state) => state.auth.user._id);

  return (
    <li
      className={`${classes.Message} ${
        userId === senderId ? classes.MessageSender : null
      }`}
    >
      {userId !== senderId && <UserImg avatarUrl={avatar} small />}
      <p className={classes.Content}>{content}</p>
      {isSending && (
        <div
          className={`${classes.BoxIcon} ${
            !isSending && classes.BoxIconAnimate
          }`}
        >
          <Plane
            className={`${classes.sendingIcon} ${
              !isSending && classes.sendingIconAnimate
            }`}
          />
        </div>
      )}
    </li>
  );
}

export default Message;
