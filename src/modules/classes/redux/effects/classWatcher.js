import actions from '../actions/classActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllClasses(action) {
  processRequestStatus(true);
  try {
    let classes = yield call(httpService.get, { url: apiEndPoint.CLASSES });
    console.log("classes",classes);
    yield put(actionCreator(actions.GET_ALL_CLASSES, classes));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_CLASSES_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* getClass(action) {
  processRequestStatus(true);
  try {
    let classes = yield call(httpService.get, {
      url: apiEndPoint.CLASSES + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_CLASS, classes));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.LOAD_CLASS_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* addClass(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.post, {
      url: apiEndPoint.CLASSES,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_CLASSES));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.ADD_CLASS_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* editClass(action) {
  console.log('action >>>>>',action);
  processRequestStatus(true);
  try {
    yield call(httpService.put, {
      url: apiEndPoint.CLASSES,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_CLASSES));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.EDIT_CLASS_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* deleteClass(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.delete, {
      url: apiEndPoint.CLASSES + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_ALL_CLASSES));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.DELETE_CLASS_ERROR,
    });
    processRequestStatus(false);
  }
}

function* classWatcher() {
  yield takeEvery(actions.LOAD_ALL_CLASSES, fetchAllClasses);
  yield takeEvery(actions.GET_CLASS, getClass);
  yield takeEvery(actions.ADD_CLASS, addClass);
  yield takeEvery(actions.EDIT_CLASS, editClass);
  yield takeEvery(actions.DELETE_CLASS, deleteClass);
}

export default classWatcher;
