import actions from '../actions/subjectActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllSubjects(action) {
  processRequestStatus(true);
  try {
    let users = yield call(httpService.get, { url: apiEndPoint.subjects });
    yield put(actionCreator(actions.GET_ALL_SUBJECTS, users));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_SUBJECTS_ERROR,
    });
    processRequestStatus(false);
  }
}

function* subjectWatcher() {
  yield takeEvery(actions.LOAD_ALL_SUBJECTS, fetchAllSubjects);
}

export default subjectWatcher;