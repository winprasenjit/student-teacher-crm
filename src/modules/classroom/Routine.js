import React from 'react';
import InputSelect from "../_shared/components/InputSelect";
import * as Yup from "yup";
import {Form, Formik} from "formik";

const Routine = () => {

  const weekDays = [
    {id: 1, name: 'Sunday'},
    {id: 2, name: 'Monday'},
    {id: 3, name: 'Tuesday'},
    {id: 4, name: 'Wednesday'},
    {id: 5, name: 'Thursday'},
    {id: 6, name: 'Friday'},
    {id: 7, name: 'Saturday'},
  ]

  const handleOnChange = () => {
  };

  return (
    <div className="row pt-30">
      <div className="col-12">
        <Formik>
          {({values, setFieldValue}) => (
            <Form onChange={handleOnChange}>
              <div className="card-style mb-30">
                <h6 className="mb-25">Set Routine</h6>
                <div className="input-style-1 d-inline-block mx-4">
                  <label>Batch</label>
                  <input type="text" placeholder="Full Name"/>
                </div>
                <div className="input-style-1 d-inline-block mx-4">
                  <label>Room Number</label>
                  <input type="text" placeholder="Full Name"/>
                </div>
                <div className="input-style-1 d-inline-block mx-4">
                  <InputSelect name="time" label="Week Days" options={weekDays}></InputSelect>
                </div>
                <div className="input-style-1 d-inline-block mx-4">
                  <label>Time</label>
                  <input type="time"/>
                </div>
                <div className="input-style-1 d-inline-block mx-4">
                  <label>Or</label>
                </div>
                <div className="input-style-1 d-inline-block mx-4">
                  <label>Date</label>
                  <input type="date"/>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Routine;
