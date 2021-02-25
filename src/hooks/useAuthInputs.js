import { useState, useEffect } from "react";

const checkValidity = (value, rules, password) => {
  let isValid = true;
  if (!rules) return isValid;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.isPassword) {
    const regexPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    );
    isValid = regexPassword.test(value) && isValid;
  }

  if (rules.isEmail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = re.test(value) && isValid;
  }

  if (rules.isPasswordConfirm) {
    isValid = value === password && isValid;
  }

  return isValid;
};

const useAuthInput = (rules, password) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(checkValidity(value, rules, password));
  }, [value, password, rules]);

  return {
    isValid,
    value,
    reset: () => setValue(""),
    bind: {
      value,
      changed: (event) => {
        setValue(event.target.value);
      },
      isValid,
    },
  };
};

export default useAuthInput;
