import React from 'react';
import { useDispatch } from 'react-redux';
import TeacherForm from './TeacherForm';
import teacherActions from './redux/actions/teacherActions';
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
    type: 'teacher',
    aboutu: '',
  };

  const save = (teacher) => 
    dispatch(actionCreator(teacherActions.ADD_TEACHER, teacher));

  return (
    <TeacherForm
      initialValues={initialValues}
      onSave={save}
      onClose={closeModal}
    />
  );
}
