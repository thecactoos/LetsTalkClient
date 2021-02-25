import React from "react";
import BackToNav from "../../../components/BackToNav/BackToNav";
// Hooks
import useGroupInfoForm from "./useGroupInfoFrom";
import { ReactComponent as CreateSVG } from "../../../assets/usersadded.svg";

// Styles
import classes from "./GroupInfoForm.module.scss";
import { Redirect } from "react-router-dom";
import { NEW_CONVERSATION_GROUP_RECEIVERS } from "../../../consts/routes";
import Spinner from "../../../layout/Spinner/Spinner";

function NewConversationGroup() {
  const {
    chatName,
    handleChatName,
    handleGroupAvatarChange,
    previewGroupAvatar,
    handleCreateConversation,
    receivers,
    isCreating,
  } = useGroupInfoForm();

  if (receivers.length === 0) {
    return <Redirect to={NEW_CONVERSATION_GROUP_RECEIVERS} />;
  }

  return (
    <div className={classes.Section}>
      <BackToNav className={classes.BtnBack} />
      <h2 className={classes.Heading}>
        <span className={classes.HeadingMain}>New group</span>
        <span className={classes.HeadingSecondary}>Add chat name</span>
      </h2>
      <form className={classes.Form} onSubmit={handleCreateConversation}>
        <label htmlFor="group-avatar" className={classes.GroupAvatarLabel}>
          <input
            type="file"
            name="group-avatar"
            id="group-avatar"
            onChange={handleGroupAvatarChange}
            className={classes.GroupAvatarInput}
          />
          {previewGroupAvatar && (
            <img
              src={previewGroupAvatar}
              alt=""
              className={classes.GroupAvatarPreview}
            />
          )}
        </label>
        <input
          type="text"
          onChange={handleChatName}
          className={classes.Input}
          placeholder="Type chat name"
          value={chatName}
        />
        <label className={classes.Comment}>
          Provide a group subject and optional group icon
        </label>
        {isCreating ? (
          <div className={classes.LoaderIsCreating}>
            <Spinner />
          </div>
        ) : (
          <button className={classes.BtnCreate} type="submit">
            <CreateSVG className={classes.BtnCreateSvg} />
          </button>
        )}
      </form>
    </div>
  );
}

export default NewConversationGroup;
