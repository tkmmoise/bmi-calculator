import authReducer from './authReducer'
import bmiDataReducer from './bmiDataReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    bmi: bmiDataReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;