import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Components
import BackLink from '../../../components/BackLink/BackLink';
import SearchReceiversaInputDesktop from '../SearchReceiversInputDesktop/SearchReceiversInputDesktop';
import SearchReceiversList from '../SearchReceiversList/SearchReceiversList';
import Receiver from '../Receiver/Receiver';
import SearchReceiverInputMobile from '../SearchReceiverInputMobile/SearchReceiverInputMobile';

// Assets
import { ReactComponent as NextSVG } from '../../../assets/right-arrow.svg';

// Hooks
import useReceiversForm from './useReceiversForm';

// Routes
import { NEW_CONVERSATION_GROUP_INFO } from '../../../consts/routes';

// Styles
import classes from './ReceiversForm.module.scss';

function ReceiversForm({ isDm }) {
  const location = useLocation();
  const history = useHistory();
  const {
    searchValue,
    clearSearchValue,
    handleSearchChange,
    handleSearchDebounce,
    filteredResult: filteredUsers,
    suggestedResult: suggestedUsers,
    showLoader,
    searchInputRef,
    addReceiver,
    removeReceiver,
    receivers,
  } = useReceiversForm(isDm);

  const isSmallScreen = useMediaQuery({
    query: '(max-width: 1023px)',
  });

  return (
    <section className={classes.Section}>
      <BackLink className={classes.BtnBack} />
      {isSmallScreen && (
        <SearchReceiverInputMobile
          className={classes.Input}
          value={searchValue}
          inputRef={searchInputRef}
          handleClearValue={clearSearchValue}
          handleChange={handleSearchChange}
        />
      )}
      <form
        id="pickreceivers"
        className={classes.Form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset className={classes.Fieldset}>
          <div className={classes.Receivers}>
            <legend className={classes.Legend}>To:</legend>
            {!isDm &&
              receivers.length !== 0 &&
              receivers.map(({ username, id: receiverId, avatar50x50 }) => (
                <Receiver
                  isReceiver
                  key={receiverId}
                  avatar={avatar50x50}
                  username={username}
                  id={receiverId}
                  handleChange={() => {
                    removeReceiver(receiverId);
                  }}
                />
              ))}
            {!isSmallScreen && (
              <SearchReceiversaInputDesktop
                handleSearchChange={handleSearchChange}
                handleSearchDebounce={handleSearchDebounce}
                searchValue={searchValue}
                searchInputRef={searchInputRef}
              >
                <SearchReceiversList
                  suggestedUsers={suggestedUsers}
                  filteredUsers={filteredUsers}
                  searchValue={searchValue}
                  showLoader={showLoader}
                  receivers={receivers}
                  addReceiver={addReceiver}
                  removeReceiver={isDm ? () => {} : removeReceiver}
                />
              </SearchReceiversaInputDesktop>
            )}
          </div>
          {isSmallScreen && (
            <SearchReceiversList
              suggestedUsers={suggestedUsers}
              filteredUsers={filteredUsers}
              searchValue={searchValue}
              showLoader={showLoader}
              receivers={receivers}
              addReceiver={addReceiver}
              removeReceiver={removeReceiver}
            />
          )}
          {/* <span ref={refReceiversEnd}>&nbsp;</span> */}
        </fieldset>
        {!isDm && isSmallScreen && receivers.length !== 0 && (
          <button
            className={classes.BtnNext}
            onClick={() => {
              history.push(NEW_CONVERSATION_GROUP_INFO, {
                from: location.pathname,
              });
            }}
            type="button"
          >
            <NextSVG className={classes.BtnNextSvg} />
          </button>
        )}
      </form>
    </section>
  );
}

export default ReceiversForm;
