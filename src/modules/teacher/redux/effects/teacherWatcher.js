import actions from '../actions/teacherActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllTeachers() {
  processRequestStatus(true);
  try {
    let teachers = yield call(httpService.get, { url: apiEndPoint.TEACHERS });
    yield put(actionCreator(actions.GET_ALL_TEACHERS, teachers));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_TEACHERS_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* getTeacher(action) {
  processRequestStatus(true);
  try {
    let teacher = yield call(httpService.get, {
      url: apiEndPoint.TEACHERS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_TEACHER, teacher));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.LOAD_TEACHER_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* addTeacher(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.post, {
      url: apiEndPoint.TEACHERS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_TEACHERS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.ADD_TEACHER_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* editTeacher(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.put, {
      url: apiEndPoint.TEACHERS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_TEACHERS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.EDIT_TEACHER_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* deleteTeacher(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.delete, {
      url: apiEndPoint.TEACHERS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_ALL_TEACHERS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.DELETE_TEACHER_ERROR
    });
    processRequestStatus(false);
  }
}

function* teacherWatcher() {
  yield takeEvery(actions.LOAD_ALL_TEACHERS, fetchAllTeachers);
  yield takeEvery(actions.GET_TEACHER, getTeacher);
  yield takeEvery(actions.ADD_TEACHER, addTeacher);
  yield takeEvery(actions.EDIT_TEACHER, editTeacher);
  yield takeEvery(actions.DELETE_TEACHER, deleteTeacher);
}

export default teacherWatcher;
