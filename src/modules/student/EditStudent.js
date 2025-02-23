import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import action from './redux/actions/studentActions';
import actionCreator from '../_shared/helpers/actionCreator';
import StudentForm from "./StudentForm";

export default function EditStudent({ closeModal }) {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState();

  const {student} = useSelector((state) => state.studentReducer);

  useEffect(() => {
    if (student) {
      setInitialValues({...student});
    }
  }, [student]);

  const save = (student) =>
    dispatch(actionCreator(action.EDIT_STUDENT, student));

  const closeEditModal = () => {
    dispatch(actionCreator(action.RESET_STUDENT));
    closeModal();
  };

  return (
    initialValues && (
      <StudentForm
        initialValues={initialValues}
        onSave={save}
        onClose={closeEditModal}
      />
    )
  );
}