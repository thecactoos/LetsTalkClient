import React from 'react';

// Assets
import { ReactComponent as XIcon } from '../../../assets/x.svg';

// Styles
import classes from './SearchReceiverInputMobile.module.scss';

function SearchReceiverInputMobile({
  value,
  handleChange,
  inputRef,
  handleClearValue,
}) {
  return (
    <div className={classes.SearchUser}>
      <label htmlFor="inputmobile" className={classes.SearchUserLabel}>
        Search user
      </label>
      <input
        className={classes.SearchUserInput}
        type="text"
        value={value}
        onChange={handleChange}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        form="pickreceivers"
        placeholder="Search user"
        id="inputmobile"
        ref={inputRef}
      />
      <button
        className={classes.SearchUserClearBtn}
        type="button"
        onClick={handleClearValue}
      >
        <XIcon className={classes.SearchUserClearIcon} />
      </button>
    </div>
  );
}

export default SearchReceiverInputMobile;
