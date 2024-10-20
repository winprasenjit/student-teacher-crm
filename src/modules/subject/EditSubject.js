import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubjectForm from './SubjectForm';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/subjectActions';

export default function EditSubject({ closeModal }) {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState();

  const { subject } = useSelector((state) => state.subjectReducer);

  useEffect(() => {
    if (subject) {
      setInitialValues({ ...subject });
    }
  }, [subject]);

  const save = (subject) =>
    dispatch(actionCreator(action.EDIT_SUBJECT, subject));

  const closeEditModal = () => {
    dispatch(actionCreator(action.RESET_SUBJECT));
    closeModal();
  };

  return (
    initialValues && (
      <SubjectForm
        initialValues={initialValues}
        onSave={save}
        onClose={closeEditModal}
      />
    )
  );
}
