import * as types from './types';
const initialState = {
  user: null,
  loginBtn: null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.User:
      return { ...state, user: action.payload };
    case types.signUp:
      return { ...state, loginBtn: 'signup' };
    case types.signIn:
      return { ...state, loginBtn: 'signin' };
    case types.defaultLoginBTN:
      return { ...state, loginBtn: null };
    case types.logout:
      return { ...state, user: null };
    default:
      return state;
  }
};
export default mainReducer;