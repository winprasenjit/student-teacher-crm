import { combineReducers } from "redux";
import applicationStateReducer from './applicationStateReducer';
import userReducer from '../../modules/authentication/redux/reducers/userReducer';
import subjectReducer from "../../modules/subject/redux/reducers/subjectReducer";
import classReducer from "../../modules/classes/redux/reducers/classReducer";
import teacherReducer from '../../modules/teacher/redux/reducers/teacherReducer';
import studentReducer from "../../modules/student/redux/reducers/studentReducer";
import batchReducer from "../../modules/batch/redux/reducers/batchReducer";
import academicReducer from "../../modules/academic/redux/reducers/academicReducer";

const rootReducer = combineReducers({
  applicationStateReducer,
  userReducer,
  subjectReducer,
  classReducer,
  teacherReducer,
  studentReducer,
  batchReducer,
  academicReducer,
})
export default rootReducer;