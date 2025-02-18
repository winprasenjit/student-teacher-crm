import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassForm from './ClassForm';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/classActions';

export default function EditClass({ closeModal }) {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState();

  const { className } = useSelector((state) => state.classReducer);

  useEffect(() => {
    if (className) {
      setInitialValues({ ...className });
    }
  }, [className]);

  const save = (className) =>
    dispatch(actionCreator(action.EDIT_CLASS, className));

  const closeEditModal = () => {
    dispatch(actionCreator(action.RESET_CLASS));
    closeModal();
  };

  return (
    initialValues && (
      <ClassForm
        initialValues={initialValues}
        onSave={save}
        onClose={closeEditModal}
      />
    )
  );
}
