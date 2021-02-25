import React from "react";
import { Link, useLocation } from "react-router-dom";
// Routes
import {
  NEW_CONVERSATION_GROUP_RECEIVERS,
  NEW_CONVERSATION_DM_RECEIVER,
} from "../../../consts/routes";
// Assets
import { ReactComponent as NewGroupSVG } from "../../../assets/group.svg";
import { ReactComponent as NewDMSVG } from "../../../assets/plane.svg";
// Components
import BackToNav from "../../../components/BackToNav/BackToNav";

// Styles
import classes from "./SelectType.module.scss";

function NewConversationSelectType() {
  const location = useLocation();
  return (
    <section className={classes.SelectType}>
      <BackToNav className={classes.Btn} />
      <h3 className={classes.BarHeading}>Select type</h3>
      <Link
        className={`${classes.ConversationTypeLink} ${classes.Group}`}
        to={{
          pathname: NEW_CONVERSATION_GROUP_RECEIVERS,
          state: { from: location.pathname },
        }}
      >
        <div className={classes.ConversationTypeLinkIconBox}>
          <NewGroupSVG
            className={`${classes.ConversationTypeLinkSVG} ${classes.ConversationTypeLinkSVG__Group}`}
          />
        </div>
        New group
      </Link>
      <Link
        className={`${classes.ConversationTypeLink} ${classes.Dm}`}
        to={{
          pathname: NEW_CONVERSATION_DM_RECEIVER,
          state: { from: location.pathname },
        }}
      >
        <div className={classes.ConversationTypeLinkIconBox}>
          <NewDMSVG className={classes.ConversationTypeLinkSVG} />
        </div>
        New direct message
      </Link>
    </section>
  );
}

export default NewConversationSelectType;
