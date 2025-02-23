import { all } from 'redux-saga/effects';
import loginWatcher from '../../modules/authentication/redux/effects/loginWatcher';
import subjectWatcher from '../../modules/subject/redux/effects/subjectWatcher';
import classWatcher from '../../modules/classes/redux/effects/classWatcher';
import teacherWatcher from '../../modules/teacher/redux/effects/teacherWatcher';
import studentWatcher from "../../modules/student/redux/effects/studentWatcher";
import batchWatcher from "../../modules/batch/redux/effects/batchWatcher";
import academicWatcher from "../../modules/academic/redux/effects/academicWatcher";

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    subjectWatcher(),
    classWatcher(),
    teacherWatcher(),
    studentWatcher(),
    batchWatcher(),
    academicWatcher()
  ]);
}