import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputText from '../_shared/components/InputText';
import InputTextArea from '../_shared/components/InputTextArea';
import InputRadio from '../_shared/components/InputRadio';

export default function TeacherForm({ initialValues, onSave, onClose }) {
  const dispatch = useDispatch();

  const [hasError, setError] = useState(false);

  const handleOnChange = (event) => {
    setError(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstname: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastname: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        username: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        password: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        mobile: Yup.number()
          .typeError('Must be a number')
          .integer('Must be a whole number')
          .min(1000000000, 'Must be exactly 10 digits')
          .max(9999999999, 'Must be exactly 10 digits')
          .required('Required'),
        email: Yup.string().email().required('Required'),
        sex: Yup.string().required('Required'),
        aboutu: Yup.string().max(200, 'Must be 200 characters or less'),
      })}
      onSubmit={(teacher, { setSubmitting }) => {
        onSave(teacher);
      }}
    >
      <Form onChange={handleOnChange}>
        <div className="add-teacher">
          <div className="modal-header">
            <h5 className="modal-title">Add Teacher</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body" style={{ maxHeight: '600px' }}>
            <div className="input-style-1">
              <InputText
                label="First Name"
                name="firstname"
                type="text"
                placeholder=""
              />
            </div>
            <div className="input-style-1">
              <InputText
                label="Last Name"
                name="lastname"
                type="text"
                placeholder=""
              />
            </div>
            <div className="input-style-1">
              <InputText
                label="Username"
                name="username"
                type="text"
                placeholder=""
              />
            </div>
            <div className="input-style-1">
              <InputText
                label="Password"
                name="password"
                type="password"
                placeholder=""
              />
            </div>
            <div className="input-style-1">
              <InputText
                label="Mobile"
                name="mobile"
                type="text"
                placeholder=""
                maxLength="10"
                onKeyPress={(e) => {
                  // Prevent entering non-numeric characters
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="input-style-1">
              <InputText
                label="Email"
                name="email"
                type="text"
                placeholder=""
              />
            </div>
            <div className="">
              <InputRadio id="male" name="sex" value="M" placeholder="">
                Male
              </InputRadio>
              <InputRadio id="female" name="sex" value="F" placeholder="">
                Female
              </InputRadio>
            </div>
            <div className="input-style-1">
              <label>Description</label>
              <InputTextArea
                placeholder="Message"
                rows="5"
                name="aboutu"
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
