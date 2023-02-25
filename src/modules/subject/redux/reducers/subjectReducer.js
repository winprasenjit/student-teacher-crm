import actions from '../actions/subjectActions';

const initalState = {
  subjects: null,
  errorMessage: null
}
export default function subjectReducer(state = initalState, action) {
  switch (action.type) {
    case actions.GET_ALL_SUBJECTS:
      return {
        ...state,
        subjects: action.data,
      };
    default:
      return state;
  }
}