import userReducer from '../../modules/authentication/redux/reducers/userReducer';
import subjectReducer from "../../modules/subject/redux/reducers/subjectReducer";
import applicationStateReducer from './applicationStateReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  applicationStateReducer,
  userReducer,
  subjectReducer,
})
export default rootReducer;