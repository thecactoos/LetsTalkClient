import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendMessageRequest } from "../../actions/chats-actions";
import { getConversationByIdRequest } from "../../actions/conversation-actions";
import createChatHeadingString from "../../utils/createheadingChatString";
import pickAvatarToDisplay from "../../utils/pickAvatarToDisplay";

const useConversation = () => {
  const dispatch = useDispatch();
  // To do
  const { conversationId } = useParams();
  // Selectors
  const userId = useSelector((state) => state.auth.user._id);
  const isLoaded = useSelector((state) => state.main.isLoaded);
  const currentConversation = useSelector((state) =>
    state.main.chats.find((chat) => chat._id === conversationId)
  );

  const sendMessageHandler = (messageContent) => {
    dispatch(sendMessageRequest({ messageContent, userId, conversationId }));
  };

  useEffect(() => {
    // Check if conversation exists in chats
    if (isLoaded) {
      if (!currentConversation) {
        dispatch(getConversationByIdRequest(conversationId));
      }
    }
  }, [currentConversation, conversationId, isLoaded, dispatch]);

  if (!currentConversation)
    return {
      members: [],
      messages: [],
      headingString: "Loading...",
    };

  return {
    members: currentConversation?.members,
    headingString: createChatHeadingString(currentConversation, userId),
    avatar: pickAvatarToDisplay(currentConversation, userId),
    messages: currentConversation?.messages,
    sendMessageHandler,
  };
};

export default useConversation;
