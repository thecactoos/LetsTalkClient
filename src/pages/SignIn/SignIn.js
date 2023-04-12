import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

// Routes
import { SIGN_UP } from '../../consts/routes';

// Styles
import classes from '../SignUp/Auth.module.scss';

const SignIn = () => {
  const isLoadingSign = useSelector((state) => state.auth.isLoadingSign);
  const errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();

  useEffect(() => dispatch(removeErrors()), [dispatch]);

  const { value: valueEmail, bind: bindEmail } = useAuthInput({
    required: true,
    isEmail: true,
  });

  const { value: valuePassword, bind: bindPassword } = useAuthInput({
    required: true,
    isPassword: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(valueEmail, valuePassword));
  };

  return (
    <section className={classes.Section} onSubmit={handleSubmit}>
      <h2
        className={`${classes.Heading} ${
          errors.length !== 0 && classes.HeadingWithError
        }`}
      >
        Welcome back!
      </h2>
      {errors.length !== 0 && <ErrorMessage msg={errors[0].msg} />}
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
      <p className={classes.ParagraphAuthSwitch}>
        Don&apos;t have an account ?
        <Link to={SIGN_UP} className={classes.LinkAuthSwitch}>
          Sign up here!
        </Link>
      </p>
    </section>
  );
};

export default SignIn;
