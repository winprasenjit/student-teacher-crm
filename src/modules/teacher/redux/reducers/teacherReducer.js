import actions from '../actions/teacherActions';

const initalState = {
  teachers: [],
  teacher: null,
  errorMessage: null,
};
export default function teacherReducer(state = initalState, action) {
  switch (action.type) {
    case actions.GET_ALL_TEACHERS:
      return {
        ...state,
        teachers: action.data,
      };

    case actions.LOAD_SUBJECT:
      return {
        ...state,
        teacher: action.data,
      };
    case actions.RESET_SUBJECT:
      return {
        ...state,
        teacher: null,
      };

    default:
      return state;
  }
}
