import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// Components
import Message from "./Message/Message";

// Styles
import classes from "./Messages.module.scss";

function Messages({ messages, members }) {
  const { conversationId } = useParams();
  const refMessagesEnd = useRef();
  // const isIntersecting = useOnScreen(refMessagesEnd);

  useEffect(() => {
    refMessagesEnd.current.scrollIntoView();
  }, [conversationId]);

  return (
    <ul className={classes.Messages}>
      {messages.length !== 0
        ? messages.map((message) => {
            return (
              <Message
                content={message.content}
                senderId={message.sender}
                avatar={
                  members.find(
                    (member) =>
                      member?._id === message.sender ||
                      member.id === message.sender
                  ).avatar50x50
                }
                key={message.tempId ? message.tempId : message._id}
                isSending={message.isSending}
              />
            );
          })
        : null}
      <li ref={refMessagesEnd}>&nbsp;</li>
    </ul>
  );
}

export default Messages;
