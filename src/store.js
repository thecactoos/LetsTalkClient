import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

// Reducers
import auth from "./reducers/auth-reducer";
import main from "./reducers/chats-reducer";
import newconversation from "./reducers/new-conversation-reducer";
import navigation from "./reducers/navigation-reducer";
import profile from "./reducers/profile-reducer";
import conversation from "./reducers/conversation-reducer";
import profileform from "./reducers/profile-form-reducer";

// Sagas
import rootSaga from "./sagas/root-saga";

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Enable to use redux devtools extensions
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth,
  main,
  newconversation,
  navigation,
  profile,
  conversation,
  profileform,
});

const middleware = [thunk, sagaMiddleware];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);
sagaMiddleware.run(rootSaga);

export default store;
