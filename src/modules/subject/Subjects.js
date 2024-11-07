import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleWrapper from '../_shared/components/TitleWrapper';
import BootstrapModal from '../_shared/components/BootstrapModal';
import AddSubject from './AddSubject';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/subjectActions';
import ReactTable from '../_shared/components/data-table/ReactTable';
import columns from '../_shared/json/subjectColums.json';
import subjectActions from './redux/actions/subjectActions';
import EditSubject from './EditSubject';

const fetchData = (dispatch) => {
  dispatch(actionCreator(action.LOAD_ALL_SUBJECTS));
};

const toggleModal = (fn, setConfig, open) => {
  fn((key) => key + 1);
  setConfig({ open });
};

export default function Subjects() {
  const dispatch = useDispatch();
  const [config, setConfig] = useState();
  const [editConfig, setEditConfig] = useState();
  const [addKey, setAddKey] = useState(1);
  const [editKey, setEditKey] = useState(1);

  const { subjects } = useSelector((state) => state.subjectReducer);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => {
    toggleModal(setAddKey, setConfig, false);
    toggleModal(setEditKey, setEditConfig, false);
  }, [subjects]);

  const onCloseModal = (fn) => {
    fn((key) => key + 1);
  };

  const onEdit = (selectedItem) => {
    dispatch(actionCreator(subjectActions.GET_SUBJECT, selectedItem));
    toggleModal(setEditKey, setEditConfig, true);
  };

  const onDelete = (subject) =>
    dispatch(actionCreator(subjectActions.DELETE_SUBJECT, subject));

  return (
    <>
      <BootstrapModal config={config} type="add">
        <AddSubject closeModal={() => onCloseModal(setAddKey)} key={addKey} />
      </BootstrapModal>
      <BootstrapModal config={editConfig} type="edit">
        <EditSubject
          closeModal={() => onCloseModal(setEditKey)}
          key={editKey}
        />
      </BootstrapModal>
      <TitleWrapper title="Subjects" />
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => toggleModal(setEditKey, setConfig, true)}
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
                actionColumn={{ edit: onEdit, delete: onDelete }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
