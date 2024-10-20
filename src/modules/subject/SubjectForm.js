import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputText from '../_shared/components/InputText';
import InputTextArea from '../_shared/components/InputTextArea';

export default function SubjectForm({ initialValues, onSave, onClose }) {
  const dispatch = useDispatch();

  const [hasError, setError] = useState(false);

  const handleOnChange = (event) => {
    setError(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        description: Yup.string().max(200, 'Must be 200 characters or less'),
      })}
      onSubmit={(subject, { setSubmitting }) => {
        onSave(subject);
      }}
    >
      <Form onChange={handleOnChange}>
        <div className="add-subject">
          <div className="modal-header">
            <h5 className="modal-title">Add Subject</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="input-style-1">
              <InputText label="Name" name="name" type="text" placeholder="" />
            </div>
            <div className="input-style-1">
              <label>Description</label>
              <InputTextArea
                placeholder="Message"
                rows="5"
                name="description"
              ></InputTextArea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <input
              type="submit"
              value="Save"
              className="btn btn-block btn-primary"
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
}
