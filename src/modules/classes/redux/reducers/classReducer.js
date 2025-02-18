import actions from '../actions/classActions';

const initialState = {
  classes: [],
  className: null,
  errorMessage: null,
};
export default function classReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_CLASSES:
      return {
        ...state,
        classes: action.data,
      };

    case actions.LOAD_CLASS:
      return {
        ...state,
        className: action.data,
      };
    case actions.RESET_CLASS:
      return {
        ...state,
        className: null,
      };

    default:
      return state;
  }
}
