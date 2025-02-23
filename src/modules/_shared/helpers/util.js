import store from '../../../redux/store'
import actionCreator from './actionCreator'
import applicationActions from  '../../../redux/actions/applicationAction'

const processRequestStatus = (status) => store.dispatch(actionCreator(applicationActions.SET_LOADER_STATUS, status));

export default processRequestStatus;