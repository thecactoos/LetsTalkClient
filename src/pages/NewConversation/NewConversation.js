import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Components
import GroupInfoForm from './GroupInfoForm/GroupInfoForm';
import SelectType from './SelectType/SelectType';
import ReceiversForm from './ReceiversForm/ReceiversForm';
import DirectMessage from './DirectMessageForm/DirectMessageFrom';

// Routes
import {
  NEW_CONVERSATION_GROUP_RECEIVERS,
  NEW_CONVERSATION_GROUP_INFO,
  NEW_CONVERSATION_DM_RECEIVER,
  NEW_CONVERSATION_DM_CONVERSATION,
  NEW_CONVERSATION,
} from '../../consts/routes';

function NewConversation() {
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 1023px)',
  });

  return (
    <>
      {isSmallScreen ? (
        <Switch>
          <Route
            exact
            path={NEW_CONVERSATION_GROUP_INFO}
            component={GroupInfoForm}
          />
          <Route
            exact
            path={NEW_CONVERSATION_GROUP_RECEIVERS}
            component={ReceiversForm}
          />
          <Route exact path={NEW_CONVERSATION_DM_RECEIVER}>
            <ReceiversForm isDm />
          </Route>
          <Route
            path={NEW_CONVERSATION_DM_CONVERSATION}
            component={DirectMessage}
          />
          <Route path={NEW_CONVERSATION} component={SelectType} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path={NEW_CONVERSATION_GROUP_RECEIVERS}>
            <GroupInfoForm />
            <ReceiversForm />
          </Route>
          <Route exact path={NEW_CONVERSATION_DM_RECEIVER}>
            <ReceiversForm isDm />
          </Route>
          <Route
            path={NEW_CONVERSATION_DM_CONVERSATION}
            component={DirectMessage}
          />
          <Route exact path={NEW_CONVERSATION} component={SelectType} />
          <Redirect
            from={NEW_CONVERSATION_GROUP_INFO}
            to={NEW_CONVERSATION_GROUP_RECEIVERS}
          />
        </Switch>
      )}
    </>
  );
}

export default NewConversation;
