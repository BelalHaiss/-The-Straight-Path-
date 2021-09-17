import * as types from './types';
const initialState = {
  user: null,
  lang: 'ar',
  loginBtn: null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.changeLang:
      return { ...state, lang: state.lang === 'ar' ? 'en' : 'ar' };
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
