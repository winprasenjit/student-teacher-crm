import actions from '../actions/loginAction';

const initalState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null, // Load from localStorage
  errorMessage: null
}
export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case actions.GET_USER_DETAILS:
      return {
        ...state,
        user: (!action.data.error) ? action.data : null,
        errorMessage: (action.data.error) ? action.data.message : null,
      };
    case actions.DELETE_USER_DETAILS:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}