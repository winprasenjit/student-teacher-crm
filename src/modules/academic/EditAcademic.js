import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionCreator from '../_shared/helpers/actionCreator';
import action from './redux/actions/academicActions';
import AcademicForm from "./AcdemicForm";

export default function EditAcademic({ closeModal }) {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState();

  const { academic } = useSelector((state) => state.academicReducer);

  useEffect(() => {
    if (academic) {
      setInitialValues({ ...academic });
    }
  }, [academic]);

  const save = (academic) =>
    dispatch(actionCreator(action.EDIT_ACADEMIC, academic));

  const closeEditModal = () => {
    dispatch(actionCreator(action.RESET_ACADEMIC));
    closeModal();
  };

  return (
    initialValues && (
      <AcademicForm
        initialValues={initialValues}
        onSave={save}
        onClose={closeEditModal}
      />
    )
  );
}
