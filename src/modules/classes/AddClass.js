import React from 'react';
import { useDispatch } from 'react-redux';
import classActions from './redux/actions/classActions';
import actionCreator from '../_shared/helpers/actionCreator';
import ClassForm from './ClassForm';

export default function AddClass({ closeModal }) {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    description: '',
  };

  const save = (subject) =>
    dispatch(actionCreator(classActions.ADD_CLASS, subject));

  return (
    <ClassForm
      initialValues={initialValues}
      onSave={save}
      onClose={closeModal}
    />
  );
}
