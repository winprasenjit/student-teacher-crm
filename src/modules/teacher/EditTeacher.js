import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TeacherForm from './TeacherForm';
import action from './redux/actions/teacherActions';
import actionCreator from '../_shared/helpers/actionCreator';

export default function EditTeacher({ closeModal }) {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState();

  const {teacher} = useSelector((state) => state.teacherReducer);

  useEffect(() => {
    if (teacher) {
      setInitialValues({...teacher});
    }
  }, [teacher]);

  const save = (teacher) =>
    dispatch(actionCreator(action.EDIT_TEACHER, teacher));

  const closeEditModal = () => {
    dispatch(actionCreator(action.RESET_TEACHER));
    closeModal();
  };

  return (
    initialValues && (
      <TeacherForm
        initialValues={initialValues}
        onSave={save}
        onClose={closeEditModal}
      />
    )
  );
}