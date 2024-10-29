import actions from '../actions/teacherActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllTeachers(action) {
  processRequestStatus(true);
  try {
    let subjects = yield call(httpService.get, { url: apiEndPoint.TEACHERS });
    yield put(actionCreator(actions.GET_ALL_TEACHERS, subjects));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_TEACHERS_ERROR,
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

export function* addSubject(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.post, {
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

export function* editSubject(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.put, {
      url: apiEndPoint.SUBJECTS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_SUBJECTS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.EDIT_SUBJECT_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* deleteSubject(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.delete, {
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

function* teacherWatcher() {
  yield takeEvery(actions.LOAD_ALL_TEACHERS, fetchAllTeachers);
  yield takeEvery(actions.GET_SUBJECT, getSubject);
  yield takeEvery(actions.ADD_SUBJECT, addSubject);
  yield takeEvery(actions.EDIT_SUBJECT, editSubject);
  yield takeEvery(actions.DELETE_SUBJECT, deleteSubject);
}

export default teacherWatcher;
