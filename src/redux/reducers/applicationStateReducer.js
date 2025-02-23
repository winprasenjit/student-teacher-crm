import applicationActions from '../actions/applicationAction';

const initialState = {
  loader: false,
}
const applicationStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case applicationActions.SET_LOADER_STATUS:
      return {
        ...state,
        loader: action.data
      };
    default:
      return state;
  }
};

export default applicationStateReducer;