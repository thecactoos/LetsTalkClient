import React from "react";

// Components
import UserImg from "../UserImg/UserImg";
import BackToNav from "../BackToNav/BackToNav";

// Style
import classes from "./ConversationBar.module.scss";

function ConversationBar({ headingString, avatar }) {
  return (
    <header className={classes.ConversationBar}>
      <BackToNav />
      <UserImg avatarUrl={avatar} />
      <h2 className={classes.HeadingUsername}>{headingString}</h2>
    </header>
  );
}

export default ConversationBar;
