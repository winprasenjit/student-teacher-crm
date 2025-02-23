import React from 'react';
import { useDispatch } from 'react-redux';
import subjectActions from './redux/actions/subjectActions';
import actionCreator from '../_shared/helpers/actionCreator';
import SubjectForm from './SubjectForm';

export default function AddSubject({ closeModal }) {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    description: '',
  };

  const save = (subject) =>
    dispatch(actionCreator(subjectActions.ADD_SUBJECT, subject));

  return (
    <SubjectForm
      initialValues={initialValues}
      onSave={save}
      onClose={closeModal}
    />
  );
}
