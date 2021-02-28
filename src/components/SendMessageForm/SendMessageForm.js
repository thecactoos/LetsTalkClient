import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

// Styles
import classes from "./SendMessageForm.module.scss";

function SendMessageForm({ submitHandler }) {
  const [message, setMessage] = useState(``);
  const inputRef = useRef();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    submitHandler(message.trim());
    inputRef.current.focus();
    setMessage("");
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSendMessage(e);
    }
  };
  return (
    <form
      className={classes.Form}
      onSubmit={handleSendMessage}
      autoComplete="off"
    >
      <label htmlFor="sendMessage" className={classes.Label}>
        Type your message
      </label>
      <TextareaAutosize
        ref={inputRef}
        className={classes.Input}
        id="sendMessage"
        placeholder="Send Message..."
        onKeyDown={onEnterPress}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        maxRows={3}
        value={message}
      />
      <button type="submit" className={classes.Button}>
        Send
      </button>
    </form>
  );
}

export default SendMessageForm;
