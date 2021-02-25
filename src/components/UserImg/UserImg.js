import React from "react";

// Style
import classes from "./UserImg.module.scss";

function UserImg({ avatarUrl, small }) {
  return (
    <div className={`${classes.ImgBox} ${small && classes.ImgBoxSmall}`}>
      <img
        className={classes.Img}
        src={
          avatarUrl ||
          "https://lets-talk-bucket.s3.amazonaws.com/default50x50.webp"
        }
        alt="Chat avatar"
      />
    </div>
  );
}

export default UserImg;
