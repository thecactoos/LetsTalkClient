import React from 'react';

// Assets
import { ReactComponent as Reset } from '../../assets/x.svg';

import classes from './SearchUserForm.module.scss';

function SearchUserForm({
  handleSubmit,
  searchValue,
  handleSearchValue,
  handleDebounce,
  clearSearchValue,
  onFocus,
}) {
  return (
    <form onSubmit={handleSubmit} className={classes.Form}>
      <label htmlFor="searchUser" className={classes.Label}>
        Search user
      </label>
      <input
        id="searchUser"
        type="text"
        name="searchUser"
        value={searchValue}
        onChange={(e) => {
          handleSearchValue(e);
          if (e.target.value.length !== 0) handleDebounce(e.target.value);
        }}
        onFocus={onFocus}
        placeholder="Search User"
        className={classes.Input}
        autoComplete="off"
      />
      {searchValue.length !== 0 && (
        <button
          type="button"
          className={classes.Button}
          onClick={clearSearchValue}
        >
          <Reset className={classes.Icon} />
        </button>
      )}
    </form>
  );
}

export default SearchUserForm;
