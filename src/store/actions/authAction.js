export const login = (email,password) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(
        email,
        password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
  
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      });
    }
}
export const ResetAuthError = () => {
  return (dispatch, getState, {getFirebase}) => {
    
      dispatch({ type: 'RESET_ERROR_MSG' })
    
  }
} 

export const signUp = (name,email,password) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      email, 
      password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        name: name
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

export const passwordReset = (email) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().sendPasswordResetEmail(
        email
      ).then(() => {
        dispatch({ type: 'PASSWORD_RESET_SUCCESS', email })
      }).catch((err)=>{
        dispatch({ type: 'PASSWORD_RESET_ERROR', err})
      });
  }
}