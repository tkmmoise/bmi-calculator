import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/index";
import reportWebVitals from "./reportWebVitals";
import rootReducer from './store/reducers/rootReducer'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createFirestoreInstance, reduxFirestore, getFirestore} from 'redux-firestore'
import {ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reduxFirestore(fbConfig)
    )
);
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
