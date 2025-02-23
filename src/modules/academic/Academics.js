import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import actionCreator from "../_shared/helpers/actionCreator";
import action from "./redux/actions/academicActions";
import BootstrapModal from "../_shared/components/BootstrapModal";
import TitleWrapper from "../_shared/components/TitleWrapper";
import ReactTable from "../_shared/components/data-table/ReactTable";
import columns from "../_shared/json/subjectColums.json";
import AddAcademic from "./AddAcademic";
import EditAcademic from "./EditAcademic";

const fetchData = (dispatch) => {
  dispatch(actionCreator(action.LOAD_ALL_ACADEMICS));
};

const toggleModal = (fn, setConfig, open) => {
  fn((key) => key + 1);
  setConfig({ open });
};
// 
export default function Academics() {
  const dispatch = useDispatch();
  const [config, setConfig] = useState();
  const [editConfig, setEditConfig] = useState();
  const [addKey, setAddKey] = useState(1);
  const [editKey, setEditKey] = useState(1);
  
  const { academics } = useSelector((state) => state.academicReducer);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => {
    toggleModal(setAddKey, setConfig, false);
    toggleModal(setEditKey, setEditConfig, false);
  }, [academics]);

  const onCloseModal = (fn) => {
    fn((key) => key + 1);
  };

  const onEdit = (selectedItem) => {
    dispatch(actionCreator(action.GET_ACADEMIC, selectedItem));
    toggleModal(setEditKey, setEditConfig, true);
  };

  const onDelete = (academic) =>
    dispatch(actionCreator(action.DELETE_ACADEMIC, academic));

  return (
    <>
      <BootstrapModal config={config} type="add">
        {<AddAcademic closeModal={() => onCloseModal(setAddKey)} key={addKey} />}
      </BootstrapModal>
      <BootstrapModal config={editConfig} type="edit">
        <EditAcademic
          closeModal={() => onCloseModal(setEditKey)}
          key={editKey}
        />
      </BootstrapModal>
      <TitleWrapper title="Academics" />
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
              <ReactTable
                columns={columns}
                rows={academics}
                actionColumn={{ edit: onEdit, delete: onDelete }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
