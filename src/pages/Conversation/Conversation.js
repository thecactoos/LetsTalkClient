import React from "react";
import ConversationBar from "../../components/ConversationBar/ConversationBar";

// Components
import Messages from "../../components/Messages/Messages";
import SendMessageForm from "../../components/SendMessageForm/SendMessageForm";

// Style
import classes from "./Conversation.module.scss";
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
