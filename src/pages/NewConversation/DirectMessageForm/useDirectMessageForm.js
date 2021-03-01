import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSelector } from "reselect";

// Actions
import { sendMessageRequest } from "../../../actions/chats-actions";
import {
  removeAllReceivers,
  createNewConversation,
} from "../../../actions/newconversation-actions";

// Routes
import { CONVERSATION_WITHOUT_ID } from "../../../consts/routes";

// Utils
import createChatHeadingString from "../../../utils/createheadingChatString";
import pickAvatarToDisplay from "../../../utils/pickAvatarToDisplay";

// Selector which return found conversation or undefined
const conversationExistingLocallyDMSelector = createSelector(
  [
    (state) => state.newconversation.receivers,
    (state) => state.auth.user._id,
    (state) => state.main.chats,
  ],
  (receivers, userId, chats) => {
    if (receivers.length === 0) {
      return false;
    }
    const membersIds = [
      ...new Set([...receivers.map((receiver) => receiver.id), userId]),
    ].sort();
    return chats.find((chat) => {
      const chatMembersIds = chat.members.map((member) => member._id);

      return (
        !chat.isGroup &&
        JSON.stringify(membersIds) === JSON.stringify(chatMembersIds)
      );
    });
  }
);

const membersSelector = createSelector(
  [
    (state) => state.newconversation.receivers,
    (state) => state.auth.user,
    conversationExistingLocallyDMSelector,
  ],
  (receivers, user, conversation) => {
    if (conversation) {
      return conversation.members;
    }
    return [...receivers, user];
  }
);

const useDirectMessageFrom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);

  const members = useSelector(membersSelector);
  const receivers = useSelector((state) => state.newconversation.receivers);
  const messages = useSelector((state) => state.newconversation.messages);

  const createdConversation = useSelector(
    (state) => state.newconversation.conversation
  );
  const conversationExistingLocallyDM = useSelector(
    conversationExistingLocallyDMSelector
  );

  const createConversationHandler = (messageContent) => {
    dispatch(createNewConversation(receivers, messageContent, user));
  };

  useEffect(() => {
    return () => {
      dispatch(removeAllReceivers());
    };
  }, [dispatch]);

  const sendMessageHandler = (messageContent) => {
    history.push({
      pathname: `${CONVERSATION_WITHOUT_ID}${conversationExistingLocallyDM._id}`,
      state: {
        fromCreateDm: true,
      },
    });
    dispatch(
      sendMessageRequest({
        messageContent,
        userId: user._id,
        conversationId: conversationExistingLocallyDM._id,
      })
    );
  };

  return {
    receivers,
    headingString: createChatHeadingString(
      {
        members,
      },
      user._id
    ),
    members,
    avatar: pickAvatarToDisplay(
      {
        members,
        isGroup: false,
        avatar50x50: null,
      },
      user._id
    ),
    messages: conversationExistingLocallyDM
      ? conversationExistingLocallyDM.messages
      : messages,
    submitHandler: conversationExistingLocallyDM
      ? sendMessageHandler
      : createConversationHandler,
    createdConversation,
  };
};

export default useDirectMessageFrom;
