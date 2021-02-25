import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message/Message";
import classes from "./Messages.module.scss";

function useOnScreen(ref, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
}

function Messages({ messages, members }) {
  const { conversationId } = useParams();
  const refMessagesEnd = useRef();
  const isIntersecting = useOnScreen(refMessagesEnd);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      refMessagesEnd.current.scrollIntoView({ behavior: "smooth" });
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }, [messages?.length, isIntersecting]);

  useEffect(() => {
    setShowBtn(false);
    refMessagesEnd.current.scrollIntoView();
  }, [conversationId]);

  return (
    <ul className={classes.Messages}>
      {messages.length !== 0
        ? messages.map((message, index, array) => {
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
