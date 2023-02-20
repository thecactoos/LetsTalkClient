import React from 'react';

// Styles
import classes from './SearchReceiversInputDesktop.module.scss';

const SearchReceiversaInputDesktop = ({
  handleSearchChange,
  handleSearchDebounce,
  searchValue,
  children,
  searchInputRef,
}) => {
  return (
    <div className={classes.PickerDesktop}>
      <input
        ref={searchInputRef}
        className={classes.InputDesktop}
        type="text"
        value={searchValue}
        onChange={(e) => {
          handleSearchChange(e);
          handleSearchDebounce(e.target.value);
        }}
        form="pickreceivers"
        placeholder="Search user"
      />
      <div className={classes.PickerResultDesktop}>{children}</div>
    </div>
  );
};

export default SearchReceiversaInputDesktop;
