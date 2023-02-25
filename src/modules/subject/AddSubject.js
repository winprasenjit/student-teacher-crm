import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from '../_shared/components/InputText';

export default function AddSubject() {

  const [hasError, setError] = useState(false);

  const save = (subject) => {
    console.log(subject);
  };

  const handleOnChange = (event) => {
    setError(false);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        acceptedTerms: false, // added for our checkbox
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        description: Yup.string()
          .max(200, "Must be 200 characters or less"),
      })}
      onSubmit={(subject, { setSubmitting }) => {
        save(subject);
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
            ></button>
          </div>
          <div className="modal-body">
            <div className="input-style-1">
              <InputText
                label="Name"
                name="name"
                type="text"
                placeholder=""
              />
            </div>
            <div className="input-style-1">
              <label>Description</label>
              <textarea placeholder="Message" rows="5" name="description"></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </Form>
    </Formik >
  );
}
