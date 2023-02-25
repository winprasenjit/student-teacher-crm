import { all } from 'redux-saga/effects';
import loginWatcher from '../../modules/authentication/redux/effects/loginWatcher';
import subjectWatcher from '../../modules/subject/redux/effects/subjectWatcher';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    subjectWatcher(),
  ]);
}