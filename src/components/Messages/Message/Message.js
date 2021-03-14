import React from "react";
import { useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";

// Assets
import { ReactComponent as PlaneSVG } from "../../../assets/paper-plane.svg";

// Components
import UserImg from "../../UserImg/UserImg";

// Style
import classes from "./Message.module.scss";

function Message({ content, senderId, isSending, avatar }) {
  const userId = useSelector((state) => state.auth.user._id);
  const transitions = useTransition(isSending, null, {
    from: {
      opacity: 0,
      transform: "translate(-5px, -10px)",
    },
    enter: {
      opacity: 1,
      width: "15px",
      transform: "translateX(0px, 0px)",
    },
    leave: {
      width: "0px",
      transform: "translate(20px, -30px)",
    },
    config: {
      duration: 150,
    },
    trail: 1000,
  });

  return (
    <li
      className={`${classes.Message} ${
        userId === senderId ? classes.MessageSender : ""
      }`}
    >
      {userId !== senderId && <UserImg avatarUrl={avatar} small />}
      <p className={classes.Content}>{content}</p>
      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div key={key} style={props}>
              <div className={`${classes.BoxSendingIcon}`}>
                <PlaneSVG className={`${classes.SendingIcon}`} />
              </div>
            </animated.div>
          )
        );
      })}
    </li>
  );
}

export default React.memo(Message);
