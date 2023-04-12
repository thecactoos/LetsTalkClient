import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Assests
import { ReactComponent as LogoutSVG } from '../../assets/logout.svg';
import { ReactComponent as CreateNewChatIcon } from '../../assets/add-new-chat.svg';
import { ReactComponent as LeftArrowIcon } from '../../assets/left-arrow-line.svg';

// Components
import Chats from './Chats/Chats';
import Users from './Users/Users';
import SearchForm from '../../components/SearchUserForm/SearchUserForm';

// Actions
import { logout } from '../../actions/auth-actions';

// Components
import Spinner from '../../layout/Spinner/Spinner';

// Styling
import classes from './Navigation.module.scss';

// Routes
import { NEW_CONVERSATION, PROFILE_FORM } from '../../consts/routes';
import UserImg from '../../components/UserImg/UserImg';

// hooks
import useNavigation from './useNavigation';

function Navigation() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.main.chats);
  const avatarUrl = useSelector((state) => state.auth.user.avatar50x50);
  const [searchMode, setSearchMode] = useState(false);

  const {
    searchValue,
    clearSearchValue,
    handleSearchChange,
    handleSearchDebounce,
    handleSearchSubmit,
    filteredResult: filteredUsers,
    suggestedResult: suggestedUsers,
    showLoader,
    isLoadedChats,
  } = useNavigation();

  return (
    <nav className={classes.Navigation}>
      <div className={classes.NavigationTop}>
        <div className={classes.NavigationTopHeader}>
          <Link to={PROFILE_FORM}>
            <UserImg avatarUrl={avatarUrl} />
          </Link>
          <h2>Chats</h2>
          {/* testing */}
          <Link to={NEW_CONVERSATION} className={classes.CreateNewChatLink}>
            <CreateNewChatIcon className={classes.CreateNewChatIcon} />
          </Link>
          <button
            className={classes.BtnUser}
            type="button"
            onClick={() => dispatch(logout())}
          >
            <LogoutSVG className={classes.LogoutSvg} />
          </button>
          {/* {username} */}
        </div>
        <div className={classes.SearchFormWrapper}>
          {searchMode && (
            <button
              onClick={() => {
                setSearchMode(false);
              }}
              className={classes.BtnCloseSearch}
              type="button"
            >
              <LeftArrowIcon className={classes.BtnCloseSearchIcon} />
            </button>
          )}
          <SearchForm
            handleSubmit={handleSearchSubmit}
            searchValue={searchValue}
            handleSearchValue={handleSearchChange}
            handleDebounce={handleSearchDebounce}
            clearSearchValue={clearSearchValue}
            onFocus={() => {
              setSearchMode(true);
            }}
          />
        </div>
      </div>
      <div className={classes.ScrollWrapper}>
        {searchMode ? (
          <>
            {/* {isLoaded ? <Chats chats={searchChats} /> : <LoaderChats />} */}
            {searchValue.length !== 0 ? (
              <>
                <h3>Users and chats</h3>
                <Users users={filteredUsers} isSearching isTyping hideHeading />
              </>
            ) : (
              <>
                <h3>Suggested</h3>
                <Users
                  users={suggestedUsers}
                  isSearching
                  isTyping
                  hideHeading
                />
              </>
            )}
            {showLoader && (
              <div className={classes.LoaderWrapper}>
                <Spinner />
              </div>
            )}
          </>
        ) : (
          <Chats chats={chats} isLoaded={isLoadedChats} />
        )}
      </div>
    </nav>
  );
}

export default Navigation;
