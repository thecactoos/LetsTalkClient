import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewGroupConversation,
  setAvatar,
  setChatName,
} from "../../../actions/newconversation-actions";

const useGroupInfoForm = () => {
  const dispatch = useDispatch();
  const chatName = useSelector((state) => state.newconversation.chatName);
  const avatarGroup = useSelector((state) => state.newconversation.avatarGroup);
  const isCreating = useSelector((state) => state.newconversation.isCreating);
  const receivers = useSelector((state) => state.newconversation.receivers);
  const [preview, setPreview] = useState();

  const handleChatName = (e) => {
    dispatch(setChatName(e.target.value));
  };

  const handleGroupAvatarChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      dispatch(setAvatar(undefined));
      return;
    }
    dispatch(setAvatar(e.target.files[0]));
  };

  useEffect(() => {
    if (!avatarGroup) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(avatarGroup);
    setPreview(objectUrl);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarGroup]);

  const handleCreateConversation = (e) => {
    e.preventDefault();
    dispatch(
      createNewGroupConversation({
        chatName,
        chatAvatarGroup: avatarGroup,
      })
    );
  };

  return {
    isCreating,
    receivers,
    chatName,
    handleChatName,
    avatarGroup,
    handleGroupAvatarChange,
    handleCreateConversation,
    previewGroupAvatar: preview,
  };
};

export default useGroupInfoForm;
