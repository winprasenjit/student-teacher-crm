import actions from '../actions/academicActions';

const initialState = {
  academics: [],
  academicUsers: [],
  academic: null,
  errorMessage: null,
};
export default function academicReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_ACADEMICS:
      return {
        ...state,
        academics: action.data,
      };

    case actions.LOAD_ACADEMIC:
      return {
        ...state,
        academic: action.data,
      };
      
    case actions.RESET_ACADEMIC:
      return {
        ...state,
        academic: null,
      };
      
     case actions.LOAD_ALL_ACADEMICS_USERS: 
       return {
         ...state,
         academicUsers: action.data,
       };

    default:
      return state;
  }
}
