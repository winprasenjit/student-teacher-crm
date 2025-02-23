import actions from '../actions/teacherActions';

const initialState = {
  teachers: [],
  teacher: null,
  errorMessage: null,
};
export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_TEACHERS:
      return {
        ...state,
        teachers: action.data,
      };

    case actions.LOAD_TEACHER:
      return {
        ...state,
        teacher: action.data,
      };
    case actions.RESET_TEACHER:
      return {
        ...state,
        teacher: null,
      };

    default:
      return state;
  }
}
