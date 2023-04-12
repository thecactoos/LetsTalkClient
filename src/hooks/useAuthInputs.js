import { useState, useEffect } from 'react';
import { fireEvent } from '@testing-library/react';

const checkValidity = (value, rules, password) => {
  let isValid = true;
  if (!rules) return isValid;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.isPassword) {
    const regexPassword = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})',
    );
    isValid = regexPassword.test(value) && isValid;
  }

  if (rules.isEmail) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = re.test(value) && isValid;
  }

  if (rules.isPasswordConfirm) {
    isValid = value === password && isValid;
  }

  return isValid;
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const useAuthInput = (rules, password, isGuestMode) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isFinishedTyping, setIsFinishedTyping] = useState(false);

  async function simulateTyping(simulatedValue) {
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < simulatedValue.length; i += 1) {
      setValue((prevValue) => prevValue + simulatedValue[i]);
      await delay(Math.floor(Math.random() * 300) + 1);
    }
    /* eslint-enable no-await-in-loop */
    setIsFinishedTyping(true);
  }

  useEffect(() => {
    setIsValid(checkValidity(value, rules, password));
  }, [value, password, rules]);

  return {
    isValid,
    value,
    simulateTyping,
    isFinishedTyping,
    reset: () => setValue(''),
    bind: {
      changed: (event) => {
        setValue(event.target.value);
      },
      value,
      isValid,
    },
  };
};

export default useAuthInput;
