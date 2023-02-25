import actions from '../actions/loginAction';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';
import loginActions from '../actions/loginAction';

export function* fetchUsers(action) {
  processRequestStatus(true);
  try {
    let users = yield call(httpService.post, { url: apiEndPoint.AUTHENTICATE, data: action.data });
    yield put(actionCreator(actions.GET_USER_DETAILS, users));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_ALL_STUDENTS_REQUEST_ERROR,
    });
    processRequestStatus(false);
  }
}

function* loginWatcher() {
  yield takeEvery(loginActions.LOGIN_DO, fetchUsers);
}

export default loginWatcher;