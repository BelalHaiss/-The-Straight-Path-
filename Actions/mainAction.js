import * as types from '../Reducers/types';

// export const getTheTechs = () => async (dispatch) => {
//   try {
//     const res = await fetch('https://it-logger-apis.herokuapp.com/api/techs');
//     const data = await res.json();
//     if (res.ok) {
//       dispatch({ type: getTechs, payload: data });
//     } else {
//       throw Error('Something wrong with fetching Technicians data  ');
//     }
//   } catch (error) {
//     dispatch(handleAlert(error.message, 'red'));
//   }
// };

export const theLogin = () => (dispatch) => {
  dispatch({ type: types.signIn });
  setTimeout(() => dispatch(theDefaultLoginBtn()), [1]);
};
export const theSignUP = () => (dispatch) => {
  dispatch({ type: types.signUp });
  setTimeout(() => dispatch(theDefaultLoginBtn()), [1]);
};
export const theDefaultLoginBtn = () => (dispatch) => {
  dispatch({ type: types.defaultLoginBTN });
};
export const theLogOut = () => (dispatch) => {
  dispatch({ type: types.logout });
};
export const theChangeLang = () => (dispatch) => {
  dispatch({ type: types.changeLang });
};
