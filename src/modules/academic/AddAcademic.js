import React from 'react';
import { useDispatch } from 'react-redux';
import action from './redux/actions/academicActions';
import actionCreator from '../_shared/helpers/actionCreator';
import AcademicForm from "./AcdemicForm";

export default function AddAcademic({ closeModal }) {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    description: '',
  };

  const save = (academic) =>
    dispatch(actionCreator(action.ADD_ACADEMIC, academic));

  return (
    <AcademicForm
      initialValues={initialValues}
      onSave={save}
      onClose={closeModal}
    />
  );
}
