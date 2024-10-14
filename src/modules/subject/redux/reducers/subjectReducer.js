import actions from '../actions/subjectActions';

const initalState = {
  subjects: null,
  subject: null,
  errorMessage: null,
};
export default function subjectReducer(state = initalState, action) {
  switch (action.type) {
    case actions.GET_ALL_SUBJECTS:
      return {
        ...state,
        subjects: action.data,
      };

    case actions.LOAD_SUBJECT:
      return {
        ...state,
        subject: action.data,
      };
    case actions.RESET_SUBJECT:
      return {
        ...state,
        subject: null,
      };

    default:
      return state;
  }
}
