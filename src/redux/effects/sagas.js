import { all } from 'redux-saga/effects';
import loginWatcher from '../../modules/authentication/redux/effects/loginWatcher';
import subjectWatcher from '../../modules/subject/redux/effects/subjectWatcher';
import teacherWatcher from '../../modules/teacher/redux/effects/teacherWatcher';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    subjectWatcher(),
    teacherWatcher(),
  ]);
}