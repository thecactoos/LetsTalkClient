import React from 'react';

// Assets
import { ReactComponent as ChooseUserSvg } from '../../assets/choose-user.svg';

// Styles
import classes from './NoConversation.module.scss';

function NoConversation() {
  return (
    <section className={classes.Section}>
      <ChooseUserSvg className={classes.ChooseUserSvg} />
      <h2 className={classes.Heading}>Please select or create new chat</h2>
    </section>
  );
}

export default NoConversation;
