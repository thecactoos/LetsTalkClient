import React, { useCallback, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import custom hook
import useAuthInput from "../../hooks/useAuthInputs";

// import components
import Input from "../../components/InputAuth/InputAuth";
import Button from "../../components/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../layout/Spinner/Spinner";

import { signUp, removeErrors } from "../../actions/auth-actions";
import { PROFILE_FORM } from "../../consts/routes";

// importCss
import classes from "./Auth.module.scss";

const SignUp = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoadingSign = useSelector((state) => state.auth.isLoadingSign);
  const errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();

  useEffect(() => dispatch(removeErrors()), [dispatch]);

  const { value: valueUsername, bind: bindUsername } = useCallback(
    useAuthInput({
      required: true,
    })
  );

  const { value: valueEmail, bind: bindEmail } = useCallback(
    useAuthInput({
      required: true,
      isEmail: true,
    })
  );

  const { value: valuePassword, bind: bindPassword } = useAuthInput({
    required: true,
    isPassword: true,
  });

  const { bind: bindPasswordConf } = useAuthInput(
    {
      required: true,
      isPassword: true,
      isPasswordConfirm: true,
    },
    valuePassword
  );

  // Redirect when u authenticated
  if (isAuthenticated) {
    return <Redirect to={PROFILE_FORM} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(valueUsername, valueEmail, valuePassword));
  };

  return (
    <section className={classes.Section} onSubmit={(e) => handleSubmit(e)}>
      <h2
        className={`${classes.Heading} ${
          errors.length !== 0 && classes.HeadingWithError
        }`}
      >
        Want to chat ?
      </h2>
      {errors.length !== 0 && <ErrorMessage msg={errors[0].msg} />}
      <form className={classes.Form}>
        <Input
          type="text"
          name="username"
          labelText="Username"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...bindUsername}
        />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Input type="email" name="email" labelText="Email" {...bindEmail} />
        <Input
          type="password"
          name="password"
          labelText="Password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...bindPassword}
        />
        <Input
          type="password"
          name="passwordConfirm"
          labelText="Confirm Password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...bindPasswordConf}
        />
        {isLoadingSign ? <Spinner /> : <Button>Sign Up</Button>}
      </form>
      <p className={classes.ParagraphAuthSwitch}>
        Already have an account ?
        <Link to="/signIn" className={classes.LinkAuthSwitch}>
          Sign in here!
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
