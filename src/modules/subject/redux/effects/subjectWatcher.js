import actions from '../actions/subjectActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllSubjects(action) {
  processRequestStatus(true);
  try {
    let subjects = yield call(httpService.get, { url: apiEndPoint.SUBJECTS });
    yield put(actionCreator(actions.GET_ALL_SUBJECTS, subjects));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_SUBJECTS_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* addSubject(action) {
  processRequestStatus(true);
  try {
    let subject = yield call(httpService.post, {
      url: apiEndPoint.SUBJECTS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_SUBJECTS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.ADD_SUBJECT_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* getSubject(action) {
  processRequestStatus(true);
  try {
    let subject = yield call(httpService.get, {
      url: apiEndPoint.SUBJECTS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_SUBJECT, subject));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.LOAD_SUBJECT_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* deleteSubject(action) {
  processRequestStatus(true);
  try {
    let subject = yield call(httpService.delete, {
      url: apiEndPoint.SUBJECTS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_ALL_SUBJECTS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.DELETE_SUBJECT_ERROR,
    });
    processRequestStatus(false);
  }
}

function* subjectWatcher() {
  yield takeEvery(actions.LOAD_ALL_SUBJECTS, fetchAllSubjects);
  yield takeEvery(actions.ADD_SUBJECT, addSubject);
  yield takeEvery(actions.GET_SUBJECT, getSubject);
  yield takeEvery(actions.DELETE_SUBJECT, deleteSubject);
}

export default subjectWatcher;
