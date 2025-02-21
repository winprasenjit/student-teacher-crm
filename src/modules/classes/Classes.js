import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleWrapper from '../_shared/components/TitleWrapper';
import BootstrapModal from '../_shared/components/BootstrapModal';
import AddClass from './AddClass';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/classActions';
import ReactTable from '../_shared/components/data-table/ReactTable';
import columns from '../_shared/json/classColumns.json';
import classActions from './redux/actions/classActions';
import EditClass from './EditClass';

const fetchData = (dispatch) => {
  dispatch(actionCreator(action.LOAD_ALL_CLASSES));
};

const toggleModal = (fn, setConfig, open) => {
  fn((key) => key + 1);
  setConfig({ open });
};

export default function Classes() {
  const dispatch = useDispatch();
  const [config, setConfig] = useState();
  const [editConfig, setEditConfig] = useState();
  const [addKey, setAddKey] = useState(1);
  const [editKey, setEditKey] = useState(1);

  const { classes } = useSelector((state) => state.classReducer);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => {
    toggleModal(setAddKey, setConfig, false);
    toggleModal(setEditKey, setEditConfig, false);
  }, [classes]);

  const onCloseModal = (fn) => {
    fn((key) => key + 1);
  };

  const onEdit = (selectedItem) => {
    // console.log(selectedItem);
    dispatch(actionCreator(classActions.GET_CLASS, selectedItem));
    toggleModal(setEditKey, setEditConfig, true);
  };

  const onDelete = (subject) =>
    dispatch(actionCreator(classActions.DELETE_CLASS, subject));

  return (
    <>
      <BootstrapModal config={config} type="add">
        <AddClass closeModal={() => onCloseModal(setAddKey)} key={addKey} />
      </BootstrapModal>
      <BootstrapModal config={editConfig} type="edit">
        <EditClass
          closeModal={() => onCloseModal(setEditKey)}
          key={editKey}
        />
      </BootstrapModal>
      <TitleWrapper title="Classes" />
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
                rows={classes}
                actionColumn={{ edit: onEdit, delete: onDelete }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
