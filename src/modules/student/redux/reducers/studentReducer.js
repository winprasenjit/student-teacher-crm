import actions from '../actions/studentActions';

const initialState = {
  students: [],
  student: null,
  errorMessage: null,
};
export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_STUDENTS:
      return {
        ...state,
        students: action.data,
      };

    case actions.LOAD_STUDENT:
      return {
        ...state,
        student: action.data,
      };
    case actions.RESET_STUDENT:
      return {
        ...state,
        student: null,
      };

    default:
      return state;
  }
}
