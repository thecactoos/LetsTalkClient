import React from "react";
import { Link, useLocation } from "react-router-dom";

// Hooks
import BackLink from "../../components/BackLink/BackLink";

// Assets
import { ReactComponent as Plane } from "../../assets/plane.svg";
import { ReactComponent as Group } from "../../assets/usersadded.svg";

// Routes
import {
  NEW_CONVERSATION_DM_CONVERSATION,
  NEW_CONVERSATION_DM_RECEIVER,
  NEW_CONVERSATION_GROUP_RECEIVERS,
} from "../../consts/routes";

// Hooks
import useProfile from "./useProfile";

// Styling
import classes from "./Profile.module.scss";

function Profile() {
  const location = useLocation();

  const { profile, isLoaded, addReceiver } = useProfile();

  return (
    isLoaded && (
      <section className={classes.Profile}>
        <div className={classes.LinkBack}>
          <BackLink />
        </div>
        <img
          src={profile.avatar300x300}
          alt="User Avatar"
          className={classes.Img}
        />
        <div className={classes.InfoWrapper}>
          <h2 className={classes.Username}>{profile.username}</h2>
          <p className={classes.Info}>{profile.bio}</p>
          <div className={classes.LinkPanel}>
            {location.state.from !== NEW_CONVERSATION_GROUP_RECEIVERS && (
              <Link
                className={classes.LinkConversation}
                to={NEW_CONVERSATION_DM_CONVERSATION}
                onClick={addReceiver}
              >
                <Plane className={classes.Plane} />
              </Link>
            )}
            {location.state.from !== NEW_CONVERSATION_DM_RECEIVER && (
              <Link
                className={classes.LinkConversation}
                to={NEW_CONVERSATION_GROUP_RECEIVERS}
                onClick={addReceiver}
              >
                <Group className={classes.Group} />
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  );
}

export default Profile;
