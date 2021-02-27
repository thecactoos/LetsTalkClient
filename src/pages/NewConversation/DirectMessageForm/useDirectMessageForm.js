import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNewConversation,
  createNewConversation,
} from "../../../actions/newconversation-actions";

const useDirectMessageFrom = () => {
  const dispatch = useDispatch();
  const receivers = useSelector((state) => state.newconversation.receivers);
  const messages = useSelector((state) => state.newconversation.messages);
  const isCreating = useSelector((state) => state.newconversation.isCreating);
  const conversation = useSelector(
    (state) => state.newconversation.conversation
  );
  const user = useSelector((state) => state.auth.user);
  const createConversationHandler = (messageContent) => {
    dispatch(createNewConversation(receivers, messageContent, user));
  };

  useEffect(() => {
    return () => {
      dispatch(clearNewConversation());
    };
  }, [dispatch]);

  return {
    receivers,
    headingString: receivers[0]?.username || "",
    avatar: receivers[0]?.avatar,
    messages,
    createConversationHandler,
    isCreating,
    conversation,
  };
};

export default useDirectMessageFrom;
