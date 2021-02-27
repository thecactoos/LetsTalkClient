import React from "react";
import useProfileForm from "./useProfileForm";
import BackToNav from "../../components/BackToNav/BackToNav";

import { ReactComponent as TickMarkSVG } from "../../assets/tick-mark.svg";
import { ReactComponent as CameraSVG } from "../../assets/camera.svg";

import classes from "./ProfileForm.module.scss";

function ProfileForm() {
  const {
    handleChangeText,
    username,
    bio,
    preview,
    currentAvatar,
    updateUsernameHandler,
    avatarChangeHandler,
    updateAvatarHandler,
    updateBioHandler,
    showBtnBio,
    showBtnUsername,
  } = useProfileForm();
  return (
    <section className={classes.Section}>
      <div className={classes.BackLinkWrapper}>
        <BackToNav />
      </div>
      <form onSubmit={updateAvatarHandler} className={classes.AvatarForm}>
        <label htmlFor="avatar" className={classes.AvatarLabel}>
          <input
            className={classes.AvatarInput}
            type="file"
            name="avatar"
            id="avatar"
            onChange={avatarChangeHandler}
          />
          <CameraSVG className={classes.AvatarSvg} />
          <img
            src={preview || currentAvatar}
            className={classes.AvatarImgCur}
            alt="Your avatar"
          />
        </label>
        {preview && (
          <button
            className={`${classes.BtnUpdate} ${classes.BtnUpdate__Avatar}`}
            type="submit"
          >
            <TickMarkSVG className={classes.TickMarkSvg} />
          </button>
        )}
      </form>
      <form onSubmit={updateUsernameHandler} className={classes.UsernameForm}>
        <input
          className={classes.UsernameInput}
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChangeText}
        />
        <label htmlFor="username" className={classes.UsernameLabel}>
          Username
        </label>
        {showBtnUsername && (
          <button className={classes.BtnUpdate} type="submit">
            <TickMarkSVG className={classes.TickMarkSvg} />
          </button>
        )}
      </form>
      <form onSubmit={updateBioHandler} className={classes.BioForm}>
        <label htmlFor="bio" className={classes.BioLabel}>
          Bio
        </label>
        <textarea
          className={classes.BioTextArea}
          type="text"
          id="bio"
          name="bio"
          value={bio}
          onChange={handleChangeText}
        />
        {showBtnBio && (
          <button className={classes.BtnUpdate} type="submit">
            <TickMarkSVG className={classes.TickMarkSvg} />
          </button>
        )}
      </form>
    </section>
  );
}

export default ProfileForm;
