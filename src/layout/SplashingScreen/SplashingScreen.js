import React from 'react';
import Spinner from '../Spinner/Spinner';
import classes from './SplashingScreen.module.scss';

const SplashingScreen = () => {
  return (
    <div className={classes.SplashingScreen}>
      <Spinner />
    </div>
  );
};

export default SplashingScreen;
