import userReducer from '../../modules/authentication/redux/reducers/userReducer';
import subjectReducer from "../../modules/subject/redux/reducers/subjectReducer";
import teacherReducer from '../../modules/teacher/redux/reducers/teacherReducer';
import applicationStateReducer from './applicationStateReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  applicationStateReducer,
  userReducer,
  subjectReducer,
  teacherReducer,
})
export default rootReducer;