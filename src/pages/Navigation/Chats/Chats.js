import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Chat from './Chat/Chat';
import LoaderChats from '../../../layout/LoaderChats/LoaderChats';

// Helpers
import createHeadingChatString from '../../../utils/createheadingChatString';
import pickAvatarToDisplay from '../../../utils/pickAvatarToDisplay';

// Style
import classes from './Chats.module.scss';

function Chats({ chats, isLoaded }) {
  const userId = useSelector((state) => state.auth.user._id);

  return (
    <>
      <ul className={classes.Chats}>
        {isLoaded ? (
          chats
            .sort((a, b) => {
              if (a.lastMessageDate < b.lastMessageDate) return 1;
              if (a.lastMessageDate > b.lastMessageDate) return -1;
              return 0;
            })
            .map((chat) => {
              return (
                <Chat
                  chatHeading={createHeadingChatString(chat, userId)}
                  id={chat._id}
                  key={chat._id || chat.tempId}
                  avatar={pickAvatarToDisplay(chat, userId)}
                  lastMessage={
                    chat?.messages[chat?.messages?.length - 1]?.content ||
                    'Group is created'
                  }
                />
              );
            })
        ) : (
          <LoaderChats />
        )}
      </ul>
    </>
  );
}

export default Chats;
