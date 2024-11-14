import actions from '../actions/studentActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllStudents() {
  processRequestStatus(true);
  try {
    let students = yield call(httpService.get, { url: apiEndPoint.STUDENTS });
    yield put(actionCreator(actions.GET_ALL_STUDENTS, students));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_STUDENTS_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* getStudent(action) {
  processRequestStatus(true);
  try {
    let student = yield call(httpService.get, {
      url: apiEndPoint.STUDENTS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_STUDENT, student));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.LOAD_STUDENT_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* addStudent(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.post, {
      url: apiEndPoint.STUDENTS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_STUDENTS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.ADD_STUDENT_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* editStudent(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.put, {
      url: apiEndPoint.STUDENTS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_STUDENTS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.EDIT_STUDENT_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* deleteStudent(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.delete, {
      url: apiEndPoint.STUDENTS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_ALL_STUDENTS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.DELETE_STUDENT_ERROR
    });
    processRequestStatus(false);
  }
}

function* studentWatcher() {
  yield takeEvery(actions.LOAD_ALL_STUDENTS, fetchAllStudents);
  yield takeEvery(actions.GET_STUDENT, getStudent);
  yield takeEvery(actions.ADD_STUDENT, addStudent);
  yield takeEvery(actions.EDIT_STUDENT, editStudent);
  yield takeEvery(actions.DELETE_STUDENT, deleteStudent);
}

export default studentWatcher;
