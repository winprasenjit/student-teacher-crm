import { all } from 'redux-saga/effects';
import loginWatcher from '../../modules/authentication/redux/effects/loginWatcher';
import subjectWatcher from '../../modules/subject/redux/effects/subjectWatcher';
import teacherWatcher from '../../modules/teacher/redux/effects/teacherWatcher';
import studentWatcher from "../../modules/student/redux/effects/studentWatcher";
import batchWatcher from "../../modules/batch/redux/effects/batchWatcher";

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    subjectWatcher(),
    teacherWatcher(),
    studentWatcher(),
    batchWatcher()
  ]);
}