import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Input from '../../components/InputAuth/InputAuth';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../layout/Spinner/Spinner';

// Custom hooks
import useAuthInput from '../../hooks/useAuthInputs';

// Actions
import { signIn, removeErrors } from '../../actions/auth-actions';

// Styles
import classes from '../SignUp/Auth.module.scss';

const SignIn = () => {
  const isLoadingSign = useSelector((state) => state.auth.isLoadingSign);
  const errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();

  useEffect(() => dispatch(removeErrors()), [dispatch]);

  const {
    value: valueEmail,
    bind: bindEmail,
    simulateTyping: simulateTypingEmail,
    isFinishedTyping: isFinishedTypingEmail,
  } = useAuthInput({
    required: true,
    isEmail: true,
    isGuest: true,
  });

  const {
    value: valuePassword,
    bind: bindPassword,
    simulateTyping: simulateTypingPassword,
    isFinishedTyping: isFinishedTypingPassword,
  } = useAuthInput({
    required: true,
    isPassword: true,
    isGuest: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(valueEmail, valuePassword));
  };

  const type = async () => {
    await simulateTypingEmail('test@test.pl');
    await simulateTypingPassword('Test1234');
  };

  useEffect(() => {
    if (!isFinishedTypingEmail) {
      type();
    }
    if (isFinishedTypingEmail && isFinishedTypingPassword) {
      dispatch(signIn(valueEmail, valuePassword));
    }
  }, [isFinishedTypingEmail, isFinishedTypingPassword, dispatch]);

  useEffect(() => {}, []);

  return (
    <section className={classes.Section} onSubmit={handleSubmit}>
      <h2
        className={`${classes.Heading} ${
          errors.length !== 0 && classes.HeadingWithError
        }`}
      >
        Hello, thank you for your time! Enjoy!
      </h2>
      {errors.length > 0 && <ErrorMessage msg={errors[0].msg} />}
      <form className={classes.Form}>
        {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
        <Input type="email" name="email" labelText="Email" {...bindEmail} />
        <Input
          type="password"
          name="password"
          labelText="Password"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...bindPassword}
        />
        {isLoadingSign ? <Spinner /> : <Button>Sign In</Button>}
      </form>
    </section>
  );
};

export default SignIn;
