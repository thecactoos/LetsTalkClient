import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { use100vh } from "react-div-100vh";
import { animated, useTransition } from "react-spring";
import { useMediaQuery } from "react-responsive";

// Routes
import {
  SIGN_IN,
  SIGN_UP,
  HOME,
  NEW_CONVERSATION,
  CONVERSATION,
  ROOT,
  PROFILE_USER,
  PROFILE_FORM,
} from "../consts/routes";

// Components
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Conversation from "./Conversation/Conversation";
import NoConversation from "./NoConversation/NoConversation";
import NewConversation from "./NewConversation/NewConversation";
import Profile from "./Profile/Profile";
import ProfileForm from "./ProfileForm/ProfileForm";
import Sidebar from "../layout/Sidebar/Sidebar";
import Navigation from "./Navigation/Navigation";
import SplashingScreen from "../layout/SplashingScreen/SplashingScreen";

// Actions
import { loadUser } from "../actions/auth-actions";

// Styles
import classes from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const isLoadingInit = useSelector((state) => state.auth.isLoadingInit);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoadingInit) {
    return <SplashingScreen />;
  }

  return (
    <>
      <Switch>
        {!isAuthenticated ? <UnauthorizedRoutes /> : <AuthorizedRoutes />}
      </Switch>
    </>
  );
}

export default App;

function UnauthorizedRoutes() {
  return (
    <>
      <Route exact path={SIGN_IN} component={SignIn} />
      <Route exact path={SIGN_UP} component={SignUp} />
      <Route path={ROOT}>
        <Redirect to={SIGN_IN} />
      </Route>
    </>
  );
}

function AuthorizedRoutes() {
  const location = useLocation();
  const height = use100vh();
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  // Transition animation
  // eslint-disable-next-line no-shadow
  const transitions = useTransition(location, (location) => location.pathname, {
    from: (item) => {
      if (item?.state?.fromCreateDm) {
        return {
          opacity: 1,
          transform: "scale(1)",
          width: "100%",
          height: "100%",
        };
      }
      return {
        opacity: 0,
        transform: "scale(0.9)",
        width: "100%",
        height: "100%",
      };
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
      width: "100%",
      height: "100%",
    },
    leave: {
      display: "none",
    },
    config: {
      duration: 200,
    },
  });

  return (
    <div className={classes.AppWrapper} style={{ height, overflow: "hidden" }}>
      {!isSmallScreen && (
        <Sidebar>
          <Navigation />
        </Sidebar>
      )}
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div key={key} style={props}>
            {isSmallScreen ? (
              <Switch location={item}>
                <Route exact path={HOME} component={Navigation} />
                <Route path={NEW_CONVERSATION} component={NewConversation} />
                <Route path={CONVERSATION} component={Conversation} />
                <Route path={PROFILE_FORM} exact component={ProfileForm} />
                <Route path={PROFILE_USER} component={Profile} />
                <Route path={ROOT}>
                  <Redirect to={HOME} />
                </Route>
              </Switch>
            ) : (
              <Switch location={item}>
                <Route exact path={HOME} component={NoConversation} />
                <Route path={NEW_CONVERSATION} component={NewConversation} />
                <Route path={CONVERSATION} component={Conversation} />
                <Route path={PROFILE_FORM} exact component={ProfileForm} />
                <Route path={PROFILE_USER} component={Profile} />
                <Route path={ROOT}>
                  <Redirect to={HOME} />
                </Route>
              </Switch>
            )}
          </animated.div>
        );
      })}
    </div>
  );
}
