import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  setReceiverDm,
  searchReceiverRequest,
  addReceiver,
  removeReceiver,
} from "../../../actions/newconversation-actions";
import { NEW_CONVERSATION_DM_CONVERSATION } from "../../../consts/routes";

import useSearchInput from "../../../hooks/useSearchInput";

const useReceiversForm = (isDm) => {
  const history = useHistory();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const searchUsers = useSelector(
    (state) => state.newconversation.searchReceivers
  );
  const isSearching = useSelector((state) => state.newconversation.isSearching);
  const receivers = useSelector((state) => state.newconversation.receivers);
  const chats = useSelector((state) => state.main.chats);
  const [filteredUsers, setFilteredUsers] = useState(searchUsers);
  const [suggested, setSuggested] = useState([]);

  const {
    handleSearchDebounce,
    handleSearchSubmit,
    clearSearchValue,
    handleSearchChange: handleChange,
    isTyping,
    searchValue,
  } = useSearchInput((value) => {
    dispatch(searchReceiverRequest(value));
  });

  const focusSearchInput = () => {
    searchInputRef.current.focus();
  };

  const handleAddReceiver = (id, username, avatar) => {
    dispatch(addReceiver(id, username, avatar));
    focusSearchInput();
    clearSearchValue();
  };

  const handleAddReceiverDm = (id, username, avatar) => {
    dispatch(setReceiverDm(id, username, avatar));
    history.push(NEW_CONVERSATION_DM_CONVERSATION, { from: location.pathname });
  };

  const handleRemoveReceiver = (id) => {
    dispatch(removeReceiver(id));
    focusSearchInput();
  };

  const handleClearValue = () => {
    clearSearchValue();
    focusSearchInput();
  };

  const handleSearchChange = (e) => {
    handleChange(e);
    handleSearchDebounce(e.target.value);
  };

  useEffect(() => {
    if (searchUsers.length !== 0 && searchValue.length !== 0) {
      const searchValueLowerCase = searchValue.toLowerCase();
      const filteredUsersBySearchValue = searchUsers.filter((user) =>
        user.username.toLowerCase().includes(searchValueLowerCase)
      );
      setFilteredUsers(filteredUsersBySearchValue);
    }
  }, [searchUsers, searchValue]);

  useEffect(() => {
    if (searchValue.length === 0) {
      const suggestedUsers = chats.reduce((users, chat) => {
        const isFounded = chat.members.filter(
          (member) => !users.map((user) => user._id).includes(member._id)
        );
        if (isFounded.length !== 0) return [...users, ...isFounded];
        return users;
      }, []);
      setSuggested(suggestedUsers);
    }
  }, [chats, searchValue.length]);

  if (isDm) {
    return {
      searchValue,
      clearSearchValue: handleClearValue,
      handleSearchChange,
      handleSearchDebounce,
      handleSearchSubmit,
      suggestedResult: suggested,
      filteredResult: filteredUsers,
      showLoader: isTyping || isSearching,
      receivers,
      addReceiver: handleAddReceiverDm,
      searchInputRef,
      focusSearchInput,
    };
  }

  return {
    searchValue,
    clearSearchValue: handleClearValue,
    handleSearchChange,
    handleSearchDebounce,
    handleSearchSubmit,
    suggestedResult: suggested,
    filteredResult: filteredUsers,
    showLoader: isTyping || isSearching,
    receivers,
    addReceiver: handleAddReceiver,
    removeReceiver: handleRemoveReceiver,
    searchInputRef,
    focusSearchInput,
  };
};

export default useReceiversForm;
