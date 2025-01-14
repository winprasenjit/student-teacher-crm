import React from 'react';
import { useDispatch } from 'react-redux';
import action from './redux/actions/batchActions';
import actionCreator from '../_shared/helpers/actionCreator';
import BatchForm from "./BatchForm";

export default function AddBatch({ closeModal }) {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    className: '',
    description: '',
    students: '',
  };

  const save = (batch) =>
    dispatch(actionCreator(action.ADD_BATCH, batch));

  return (
    <BatchForm
      initialValues={initialValues}
      onSave={save}
      onClose={closeModal}
    />
  );
}
