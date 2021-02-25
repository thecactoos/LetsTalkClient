import React from "react";

import Spinner from "../../../layout/Spinner/Spinner";

import classes from "./SearchReceiversList.module.scss";
import Receiver from "../SearchReceiversItem/SearchReceiversItem";
import { ReactComponent as UserNotFoundIcon } from "../../../assets/user-not-found.svg";

const isReceiver = (id, receivers) =>
  receivers.map((receiver) => receiver.id).includes(id);

const SearchReceiversList = ({
  suggestedUsers,
  filteredUsers,
  searchValue,
  showLoader,
  receivers,
  addReceiver,
  removeReceiver,
}) => {
  return (
    <div className={classes.SearchReceiversList}>
      {searchValue.length === 0 ? (
        <>
          <h3 className={classes.Heading}>Suggested users</h3>
          {suggestedUsers.map(({ username, _id, avatar50x50 }) => (
            <Receiver
              key={_id}
              username={username}
              avatar={avatar50x50}
              isReceiver={isReceiver(_id, receivers)}
              id={_id}
              handleChange={() => {
                if (isReceiver(_id, receivers)) {
                  removeReceiver(_id);
                } else {
                  addReceiver(_id, username, avatar50x50);
                }
              }}
            />
          ))}
        </>
      ) : (
        <>
          {filteredUsers.length === 0 && !showLoader ? (
            <div className={classes.UserNotFound}>
              <UserNotFoundIcon className={classes.UserNotFoundIcon} />
              <p className={classes.UserNotFoundMessage}>
                There is no user with given username
              </p>
            </div>
          ) : (
            filteredUsers.map(({ username, _id, avatar50x50 }) => (
              <Receiver
                key={_id}
                username={username}
                avatar={avatar50x50}
                isReceiver={isReceiver(_id, receivers)}
                id={_id}
                handleChange={() => {
                  if (isReceiver(_id, receivers)) {
                    removeReceiver(_id);
                  } else {
                    addReceiver(_id, username, avatar50x50);
                  }
                }}
              />
            ))
          )}
        </>
      )}
      {showLoader && (
        <div className={classes.Loader}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default SearchReceiversList;
