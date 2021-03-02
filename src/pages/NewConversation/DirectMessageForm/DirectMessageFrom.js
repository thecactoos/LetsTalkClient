import React from "react";
import { Redirect } from "react-router-dom";

// Components
import Messages from "../../../components/Messages/Messages";
import SendMessageForm from "../../../components/SendMessageForm/SendMessageForm";
import ConversationBar from "../../../components/ConversationBar/ConversationBar";

// Routes
import {
  CONVERSATION_WITHOUT_ID,
  NEW_CONVERSATION,
} from "../../../consts/routes";

// Hooks
import useDirectMessageFrom from "./useDirectMessageForm";

// Styles
import classes from "./DirectMessageForm.module.scss";

function DirectMessageForm() {
  const {
    receivers,
    members,
    headingString,
    submitHandler,
    messages,
    createdConversation,
    avatar,
  } = useDirectMessageFrom();

  if (createdConversation) {
    return (
      <Redirect
        to={{
          pathname: `${CONVERSATION_WITHOUT_ID}${createdConversation._id}`,
          state: {
            fromCreateDm: true,
          },
        }}
      />
    );
  }
  if (receivers.length === 0) {
    return <Redirect to={NEW_CONVERSATION} />;
  }

  return (
    <section className={classes.Section}>
      <ConversationBar headingString={headingString} avatar={avatar} />
      <Messages messages={messages} members={members} />
      <SendMessageForm submitHandler={submitHandler} />
    </section>
  );
}

export default DirectMessageForm;
