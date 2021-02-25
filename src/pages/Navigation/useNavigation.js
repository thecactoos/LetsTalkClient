import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserRequest } from "../../actions/navigation-actions";
import useSearchInput from "../../hooks/useSearchInput";

const useNavigation = () => {
  const dispatch = useDispatch();
  const searchUsers = useSelector((state) => state.navigation.searchUsers);
  const isSearching = useSelector((state) => state.navigation.isSearching);
  const chats = useSelector((state) => state.main.chats);
  const isLoadedChats = useSelector((state) => state.main.isLoaded);
  const [filteredUsers, setFilteredUsers] = useState(searchUsers);
  const [suggested, setSuggested] = useState([]);

  const {
    handleSearchDebounce,
    handleSearchSubmit,
    clearSearchValue,
    handleSearchChange,
    isTyping,
    searchValue,
  } = useSearchInput((value) => {
    dispatch(searchUserRequest(value));
  });

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
      const suggested = chats.reduce((users, chat) => {
        const isFounded = chat.members.filter(
          (member) => !users.map((user) => user._id).includes(member._id)
        );
        if (isFounded.length !== 0) return [...users, ...isFounded];
        return users;
      }, []);
      setSuggested(suggested);
    }
  }, [chats, searchValue.length]);

  return {
    searchValue,
    clearSearchValue,
    handleSearchChange,
    handleSearchDebounce,
    handleSearchSubmit,
    suggestedResult: suggested,
    filteredResult: filteredUsers,
    showLoader: isTyping || isSearching,
    isLoadedChats,
  };
};

export default useNavigation;
