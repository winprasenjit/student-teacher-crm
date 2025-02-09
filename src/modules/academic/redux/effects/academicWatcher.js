import actions from '../actions/academicActions';
import {takeEvery, put, call} from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllAcademics() {
  processRequestStatus(true);
  try {
    let academics = yield call(httpService.get, {url: apiEndPoint.ACADEMICS});
    yield put(actionCreator(actions.GET_ALL_ACADEMICS, academics));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_ACADEMICS_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* getAcademics(action) {
  processRequestStatus(true);
  try {
    let academic = yield call(httpService.get, {
      url: apiEndPoint.ACADEMICS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_ACADEMIC, academic));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.LOAD_ACADEMIC_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* addAcademics(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.post, {
      url: apiEndPoint.ACADEMICS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_ACADEMICS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.ADD_ACADEMIC_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* editAcademics(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.put, {
      url: apiEndPoint.ACADEMICS,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_ACADEMICS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.EDIT_ACADEMIC_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* deleteAcademics(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.delete, {
      url: apiEndPoint.ACADEMICS + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_ALL_ACADEMICS));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.DELETE_ACADEMIC_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* fetchAcademicUsers(action) {
  processRequestStatus(true);
  const {value: academicId} = action.data;
  if (!academicId) {
    yield put(actionCreator(actions.LOAD_ALL_ACADEMICS_USERS, []));
    processRequestStatus(false);
  } else {
    try {
      const users = yield call(httpService.get, {
        url: apiEndPoint.ACADEMICS + '/batch/' + academicId,
      });
      yield put(actionCreator(actions.LOAD_ALL_ACADEMICS_USERS, users));
      processRequestStatus(false);
    } catch (error) {
      yield put({
        type: actions.DELETE_ACADEMIC_USERS_ERROR,
      });
      processRequestStatus(false);
    }
  }
}

function* academicWatcher() {
  yield takeEvery(actions.LOAD_ALL_ACADEMICS, fetchAllAcademics);
  yield takeEvery(actions.GET_ACADEMIC, getAcademics);
  yield takeEvery(actions.ADD_ACADEMIC, addAcademics);
  yield takeEvery(actions.EDIT_ACADEMIC, editAcademics);
  yield takeEvery(actions.DELETE_ACADEMIC, deleteAcademics);
  yield takeEvery(actions.LOAD_ACADEMIC_USERS, fetchAcademicUsers);
}

export default academicWatcher;
