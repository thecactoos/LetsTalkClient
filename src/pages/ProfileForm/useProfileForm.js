import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvatarProfile,
  setBio,
  setUsername,
  updateBioRequest,
  updateUsernameRequest,
  updateAvatarRequest,
} from "../../actions/profile-form-actions";

const useProfileForm = () => {
  const dispatch = useDispatch();
  const currentAvatar = useSelector((state) => state.auth.user.avatar300x300);
  const currentBio = useSelector((state) => state.auth.user.bio);
  const currentUsername = useSelector((state) => state.auth.user.username);
  const username = useSelector((state) => state.profileform.username);
  const bio = useSelector((state) => state.profileform.bio);
  const avatar = useSelector((state) => state.profileform.avatar);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    if (e.target.name === "username") {
      dispatch(setUsername(e.target.value));
    } else if (e.target.name === "bio") {
      dispatch(setBio(e.target.value));
    }
  };

  const handleAvatarChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      dispatch(setAvatarProfile(undefined));
      return;
    }
    dispatch(setAvatarProfile(e.target.files[0]));
  };

  useEffect(() => {
    if (!avatar) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(avatar);
    setPreview(objectUrl);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  const updateUsernameHandler = (e) => {
    e.preventDefault();
    dispatch(updateUsernameRequest(username.trim()));
  };
  const updateBioHandler = (e) => {
    e.preventDefault();
    dispatch(updateBioRequest(bio.trim()));
  };

  const updateAvatarProfile = (e) => {
    e.preventDefault();
    if (avatar) {
      dispatch(updateAvatarRequest(avatar));
    }
  };

  return {
    username,
    bio,
    preview,
    currentAvatar,
    avatarChangeHandler: handleAvatarChange,
    updateUsernameHandler,
    updateBioHandler,
    showBtnBio: currentBio !== bio.trim(),
    showBtnUsername: currentUsername !== username.trim(),
    updateAvatarHandler: updateAvatarProfile,
    handleChangeText: handleInputChange,
  };
};

export default useProfileForm;
