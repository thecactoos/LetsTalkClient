import React from "react";
import { useTransition, animated } from "react-spring";

// Components
import Message from "./Message/Message";

// Styles
import classes from "./Messages.module.scss";

// Hooks
import useMessages from "./useMessages";

function Messages({ messages, members }) {
  const { showMessages, refMessagesStart, refMessagesEnd } = useMessages(
    messages
  );
  const transitions = useTransition(showMessages, null, {
    from: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1rem 2fr 5fr 2fr 1rem",
      alignContent: "start",
      listStyle: "none",
      paddingTop: "1rem",
      position: "relative",
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className={classes.MessagesWrapper}>
      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <animated.ul key={key} style={props}>
              <li
                ref={refMessagesStart}
                className={classes.MessagesStartListItem}
              >
                &nbsp;
              </li>
              {messages.map((message) => {
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
              })}
              <li ref={refMessagesEnd} className={classes.MessagesEndListItem}>
                &nbsp;
              </li>
            </animated.ul>
          )
      )}
    </div>
  );
}

export default Messages;
