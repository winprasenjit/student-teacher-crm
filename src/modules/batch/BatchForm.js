import React, {useEffect, useState} from 'react';                   
import {useDispatch, useSelector} from 'react-redux';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import InputText from '../_shared/components/InputText';
import InputTextArea from '../_shared/components/InputTextArea';
import InputSelect from "../_shared/components/InputSelect";
import actionCreator from "../_shared/helpers/actionCreator";
import action from "../academic/redux/actions/academicActions";

const fetchData = (dispatch) => dispatch(actionCreator(action.LOAD_ALL_ACADEMICS));

const loadStudents = async (value, dispatch, fieldName, setFieldValue) => {
  setFieldValue(fieldName, value);
  dispatch(actionCreator(action.LOAD_ACADEMIC_USERS, {value}));
};

export default function BatchForm({initialValues, onSave, onClose}) {
  const dispatch = useDispatch();
  const {academics} = useSelector((state) => state.academicReducer);
  const {academicUsers} = useSelector((state) => state.academicReducer);
  const [hasError, setError] = useState(false);
  const [classEducation, setClassEducation] = useState([]);

  const handleOnChange = () => setError(false);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => {
    const academicList = academics.map((item) => ({
      ...
        item,
      ...
        {
          id: item._id
        }
    }));
    setClassEducation(academicList);
  }, [academics]);

  useEffect(() => {
    const value = initialValues?.className;
    if (value) {
      dispatch(actionCreator(action.LOAD_ACADEMIC_USERS, {value}));
    }
  }, [initialValues.className]);

  const handleOnStudentSelect = (event, fieldName, setFieldValue) => {
    const value = event.target.value;
    if (event.target.checked) {
      setFieldValue('fieldName', [...value, value]);
    } else {
      setFieldValue('fieldName', value.filter((item) => item !== value));
    }
  };

  const toggleChecked = (event) => {
    console.log(event.target.checked);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('Required'),
        description: Yup.string().max(200, 'Must be 200 characters or less'),
      })}
      onSubmit={(batch, {setSubmitting}) => {
        onSave(batch);
      }}
    >
      {({values, setFieldValue}) => (
        <Form onChange={handleOnChange}>
          <div className="add-batch">
            <div className="modal-header">
              <h5 className="modal-title">Add Batch</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body row">
              <div className="input-style-1">
                <InputText label="Name" name="name" type="text" placeholder=""/>
              </div>
              <div className="col-sm-6">
                <InputSelect name="className" label="Class" options={classEducation}
                             onChange={(event) => loadStudents(event.target.value, dispatch, 'className', setFieldValue)}></InputSelect>
              </div>
              <div className="col-sm-6">
                <label className="mb-2">Students</label>
                <div className="base-list-box">
                  <ul>
                    {academicUsers && academicUsers.length > 0 ? (
                      <>
                        <li>
                          <div className="form-check">
                            <input
                              id="checkbox-select-all"
                              className="form-check-input"
                              type="checkbox"
                              value="true"
                              onChange={toggleChecked}
                            />
                            <label className="form-check-label" htmlFor="checkbox-select-all">Check All</label>
                          </div>
                        </li>
                        {academicUsers.map((user) => (
                          <li key={user._id}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={user._id}
                                id="checkbox-1"
                                name="students"
                                checked={values.students?.includes(user._id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    // Add the option to the students array
                                    setFieldValue('students', [
                                      ...values.students,
                                      user._id,
                                    ]);
                                  } else {
                                    // Remove the option from the students array
                                    setFieldValue(
                                      'students',
                                      values.students.filter((item) => item !== user._id)
                                    );
                                  }
                                }}
                              />
                              <label className="form-check-label" htmlFor="checkbox-1">{user.firstname + ' ' + user.lastname}</label>
                            </div>
                          </li>
                        ))}
                      </>) : (
                      <li className="p-1">No students found</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="input-style-1">
                <label>Description</label>
                <InputTextArea
                  placeholder="Description"
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
      )}
    </Formik>
  );
}
