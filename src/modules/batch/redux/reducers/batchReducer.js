import actions from '../actions/batchActions';

const initialState = {
  batches: [],
  batch: null,
  errorMessage: null,
};
export default function batchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_BATCHES:
      return {
        ...state,
        batches: action.data,
      };

    case actions.LOAD_BATCH:
      return {
        ...state,
        batch: action.data,
      };
    case actions.RESET_BATCH:
      return {
        ...state,
        batch: null,
      };

    default:
      return state;
  }
}
