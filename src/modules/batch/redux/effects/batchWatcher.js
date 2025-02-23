import actions from '../actions/batchActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import apiEndPoint from '../../../_shared/config/api.endpoint';
import httpService from '../../../_shared/services/HttpService';
import actionCreator from '../../../_shared/helpers/actionCreator';
import processRequestStatus from '../../../_shared/helpers/util';

export function* fetchAllBatches(action) {
  processRequestStatus(true);
  try {
    let batches = yield call(httpService.get, { url: apiEndPoint.BATCHES });
    yield put(actionCreator(actions.GET_ALL_BATCHES, batches));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.GET_LOAD_BATCHES_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* getBatch(action) {
  processRequestStatus(true);
  try {
    let batch = yield call(httpService.get, {
      url: apiEndPoint.BATCHES + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_BATCH, batch));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.LOAD_BATCH_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* addBatch(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.post, {
      url: apiEndPoint.BATCHES,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_BATCHES));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.ADD_BATCH_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* editBatch(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.put, {
      url: apiEndPoint.BATCHES,
      data: action.data,
    });
    yield put(actionCreator(actions.LOAD_ALL_BATCHES));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.EDIT_BATCH_ERROR,
    });
    processRequestStatus(false);
  }
}

export function* deleteBatch(action) {
  processRequestStatus(true);
  try {
    yield call(httpService.delete, {
      url: apiEndPoint.BATCHES + '/' + action.data._id,
    });
    yield put(actionCreator(actions.LOAD_ALL_BATCHES));
    processRequestStatus(false);
  } catch (error) {
    yield put({
      type: actions.DELETE_BATCH_ERROR,
    });
    processRequestStatus(false);
  }
}

function* batchWatcher() {
  yield takeEvery(actions.LOAD_ALL_BATCHES, fetchAllBatches);
  yield takeEvery(actions.GET_BATCH, getBatch);
  yield takeEvery(actions.ADD_BATCH, addBatch);
  yield takeEvery(actions.EDIT_BATCH, editBatch);
  yield takeEvery(actions.DELETE_BATCH, deleteBatch);
}

export default batchWatcher;
