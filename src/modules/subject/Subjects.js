import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleWrapper from '../_shared/components/TitleWrapper';
import BootstrapModal from '../_shared/components/BootstrapModal';
import AddSubject from './AddSubject';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/subjectActions';
import ReactTable from '../_shared/components/data-table/ReactTable';
import columns from '../_shared/json/subjectColums.json';

const fetchData = (dispatch) => {
  dispatch(actionCreator(action.LOAD_ALL_SUBJECTS));
};

const toggleModal = (setConfig, open) => {
  setConfig({ open });
};

export default function Subjects() {
  const dispatch = useDispatch();
  const [config, setConfig] = useState();

  const { subjects } = useSelector((state) => state.subjectReducer);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => toggleModal(setConfig, false), [subjects]);

  const onEdit = (selectedItem) => console.log(selectedItem);

  return (
    <>
      <BootstrapModal config={config}>
        <AddSubject />
      </BootstrapModal>
      <TitleWrapper title="Subjects" />
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => toggleModal(setConfig, true)}
      >
        Add
      </button>
      <div className="tables-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="card-style mb-30">
              {/* <BootstrapTable listData={subjects} /> */}
              <ReactTable
                columns={columns}
                rows={subjects}
                actionColumn={{ edit: onEdit }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
