import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useOnScreen from '../../hooks/useOnScreen';

const useMessages = (messages) => {
  const refMessagesEnd = useRef(null);
  const refMessagesStart = useRef(null);
  const isLoaded = useSelector((state) => state.main.isLoaded);
  const [isInitial, setIsInitial] = useState(true);
  const isMessagesEndVisible = useOnScreen(refMessagesEnd);
  const isMessagesStartVisible = useOnScreen(refMessagesStart);

  useEffect(() => {
    if (isLoaded && messages.length !== 0) {
      // Initially show messages in the end, without smooth scroll
      if (isInitial) {
        refMessagesEnd.current.scrollIntoView(false);
        setIsInitial(false);
        // Scroll smooth when user is in the end of messages
      } else if (isMessagesEndVisible) {
        refMessagesEnd.current.scrollIntoView({ behavior: 'smooth' });
      } else if (
        Object.prototype.hasOwnProperty.call(
          messages[messages.length - 1],
          'tempId',
        )
        // Scroll to last messages when logged user send message
      ) {
        refMessagesEnd.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isLoaded, isMessagesEndVisible, isInitial, refMessagesEnd]);

  useEffect(() => {
    if (isMessagesStartVisible) {
      console.log('download');
      // TO-DO
      // GET HISTORY
    }
  }, [isMessagesStartVisible]);

  return {
    showMessages: messages.length !== 0,
    refMessagesStart,
    refMessagesEnd,
  };
};

export default useMessages;
