import React from "react";

// Components
import ConversationBar from "../../components/ConversationBar/ConversationBar";
import Messages from "../../components/Messages/Messages";
import SendMessageForm from "../../components/SendMessageForm/SendMessageForm";

// Style
import classes from "./Conversation.module.scss";

// Hooks
import useConversation from "./useConversation";

const Conversation = () => {
  const {
    members,
    messages,
    sendMessageHandler,
    headingString,
    avatar,
  } = useConversation();

  return (
    <section className={classes.Conversation}>
      <ConversationBar headingString={headingString} avatar={avatar} />
      <Messages messages={messages} members={members} />
      <SendMessageForm submitHandler={sendMessageHandler} />
    </section>
  );
};

export default Conversation;
