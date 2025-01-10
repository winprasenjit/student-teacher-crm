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

const loadStudents = async (value, dispatch) => dispatch(actionCreator(action.LOAD_ACADEMIC_USERS, {value}));

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        description: Yup.string().max(200, 'Must be 200 characters or less'),
      })}
      onSubmit={(batch, {setSubmitting}) => {
        onSave(batch);
      }}
    >
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
              <InputSelect name="class" label="Class" options={classEducation}
                           onChange={(event) => loadStudents(event.target.value, dispatch)}></InputSelect>
            </div>
            <div className="col-sm-6">
              <label className="mb-2">Students</label>
              <div class="base-list-box">
                <ul>
                  {academicUsers && academicUsers.length > 0 ? (
                    academicUsers.map((user) => (
                      <li>
                        <div class="form-check">
                          <input className="form-check-input" type="checkbox" value={user._id} id="checkbox-1"/>
                          <label className="form-check-label" htmlFor="checkbox-1">{user.firstname + ' ' + user.lastname}</label>
                        </div>
                      </li>
                    ))
                  ) : (
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
    </Formik>
  );
}
