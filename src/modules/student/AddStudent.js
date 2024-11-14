import React from 'react';
import { useDispatch } from 'react-redux';
import action from './redux/actions/studentActions';
import actionCreator from '../_shared/helpers/actionCreator';
import StudentForm from "./StudentForm";

export default function AddStudent({ closeModal }) {
  const dispatch = useDispatch();
  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    mobile: '',
    email: '',
    sex: 'M',
    type: 'student',
    aboutu: '',
  };

  const save = (student) => 
    dispatch(actionCreator(action.ADD_STUDENT, student));

  return (
    <StudentForm
      initialValues={initialValues}
      onSave={save}
      onClose={closeModal}
    />
  );
}
