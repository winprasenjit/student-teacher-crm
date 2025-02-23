import React from 'react';
import { useDispatch } from 'react-redux';
import TeacherForm from './TeacherForm';
import action from './redux/actions/teacherActions';
import actionCreator from '../_shared/helpers/actionCreator';

export default function AddTeacher({ closeModal }) {
  const dispatch = useDispatch();
  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    mobile: '',
    email: '',
    sex: 'M',
    qualification: '',
    type: 'teacher',
    aboutu: '',
  };

  const save = (teacher) => 
    dispatch(actionCreator(action.ADD_TEACHER, teacher));

  return (
    <TeacherForm
      initialValues={initialValues}
      onSave={save}
      onClose={closeModal}
    />
  );
}
