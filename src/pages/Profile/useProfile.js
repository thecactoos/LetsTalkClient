import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addReceiver,
  removeReceiver,
} from "../../actions/newconversation-actions";
import { getProfileRequest } from "../../actions/profile-actions";

const useProfile = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.main.isConnected);
  const { profile, isLoaded } = useSelector((state) => state.profile);
  const receivers = useSelector((state) => state.newconversation.receivers);
  useEffect(() => {
    if (isConnected) {
      dispatch(getProfileRequest(userID));
    }
  }, [isConnected, dispatch, userID]);

  const addReceiverHandler = () => {
    dispatch(addReceiver(profile._id, profile.username, ""));
  };
  const removeReceiverHandler = () => {
    dispatch(removeReceiver(userID));
  };

  return {
    profile,
    isLoaded,
    addReceiver: addReceiverHandler,
    removeReceiver: removeReceiverHandler,
    isReceiver: receivers.find((receiver) => receiver.id === userID),
  };
};

export default useProfile;
