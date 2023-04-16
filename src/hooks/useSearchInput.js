import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const useSearchInput = (searchRequest) => {
  const [searchValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSearchDebounce = useCallback(
    debounce((value) => {
      if (value.length !== 0) {
        searchRequest(value);
      }
      setIsTyping(false);
    }, 300),
    [],
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length !== 0) searchRequest(searchValue);
  };

  const clearSearchValue = () => {
    setSearchValue('');
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length !== 0) setIsTyping(true);
  };

  return {
    handleSearchDebounce,
    handleSearchSubmit,
    clearSearchValue,
    handleSearchChange,
    isTyping,
    searchValue,
  };
};

export default useSearchInput;
