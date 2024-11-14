import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TitleWrapper from '../_shared/components/TitleWrapper';
import BootstrapModal from '../_shared/components/BootstrapModal';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/studentActions';
import ReactTable from '../_shared/components/data-table/ReactTable';
import columns from '../_shared/json/studentColums.json';
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";

const fetchData = (dispatch) => dispatch(actionCreator(action.LOAD_ALL_STUDENTS));

const toggleModal = (fn, setConfig, open) => {
  fn((key) => key + 1);
  setConfig({open});
};

export default function Students() {
  const dispatch = useDispatch();
  const [config, setConfig] = useState();
  const [editConfig, setEditConfig] = useState();
  const [addKey, setAddKey] = useState(1);
  const [editKey, setEditKey] = useState(1);

  const {students} = useSelector((state) => state.studentReducer);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => {
    toggleModal(setAddKey, setConfig, false);
    toggleModal(setEditKey, setEditConfig, false);
  }, [students]);

  const onCloseModal = (fn) => {
    fn((key) => key + 1);
  };

  const onEdit = (selectedItem) => {
    dispatch(actionCreator(action.GET_STUDENT, selectedItem));
    toggleModal(setEditKey, setEditConfig, true);
  };

  const onDelete = (student) =>
    dispatch(actionCreator(action.DELETE_STUDENT, student));

  return (
    <>
      <BootstrapModal config={config} type="add">
        <AddStudent closeModal={() => onCloseModal(setAddKey)} key={addKey}/>
      </BootstrapModal>
      <BootstrapModal config={editConfig} type="edit">
        <EditStudent
          closeModal={() => onCloseModal(setEditKey)}
          key={editKey}
        />
      </BootstrapModal>
      <TitleWrapper title="Students"/>
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => toggleModal(setAddKey, setConfig, true)}
      >
        Add
      </button>
      <div className="tables-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="card-style mb-30">
              <ReactTable
                columns={columns}
                rows={students}
                actionColumn={{edit: onEdit, delete: onDelete}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
