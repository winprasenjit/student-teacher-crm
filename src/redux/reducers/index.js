import { combineReducers } from "redux";
import applicationStateReducer from './applicationStateReducer';
import userReducer from '../../modules/authentication/redux/reducers/userReducer';
import subjectReducer from "../../modules/subject/redux/reducers/subjectReducer";
import teacherReducer from '../../modules/teacher/redux/reducers/teacherReducer';
import studentReducer from "../../modules/student/redux/reducers/studentReducer";
import batchReducer from "../../modules/batch/redux/reducers/batchReducer";

const rootReducer = combineReducers({
  applicationStateReducer,
  userReducer,
  subjectReducer,
  teacherReducer,
  studentReducer,
  batchReducer,
})
export default rootReducer;