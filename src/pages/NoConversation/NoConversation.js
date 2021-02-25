import React from "react";
import { ReactComponent as ChooseUserSvg } from "../../assets/choose-user.svg";

import classes from "./NoConversation.module.scss";

function NoConversation() {
  // Add nice svg and add to btn

  return (
    <section className={classes.Section}>
      <ChooseUserSvg className={classes.ChooseUserSvg} />
      <h2 className={classes.Heading}>Please select or create new chat</h2>
    </section>
  );
}

export default NoConversation;
