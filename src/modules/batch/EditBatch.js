import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/batchActions';
import BatchForm from "./BatchForm";

export default function EditBatch({ closeModal }) {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState();

  const { batch } = useSelector((state) => state.batchReducer);

  useEffect(() => {
    if (batch) {
      setInitialValues({ ...batch });
    }
  }, [batch]);

  const save = (batch) =>
    dispatch(actionCreator(action.EDIT_BATCH, batch));

  const closeEditModal = () => {
    dispatch(actionCreator(action.RESET_BATCH));
    closeModal();
  };

  return (
    initialValues && (
      <BatchForm
        initialValues={initialValues}
        onSave={save}
        onClose={closeEditModal}
      />
    )
  );
}
