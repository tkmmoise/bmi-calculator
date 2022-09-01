const initState = {
  authError: null,
  successForgotMsg: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message,
      };
    case "RESET_ERROR_MSG":
      console.log("reset error msg");
      return {
        ...state,
        authError: null,
        successForgotMsg: null,
      };
    case "PASSWORD_RESET_SUCCESS":
      console.log("password reset success");
      return {
        ...state,
        authError: null,
        successForgotMsg: `Check your email ${action.email} to reset your password`
      };

    case "PASSWORD_RESET_ERROR":
      console.log("password reset error");
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
