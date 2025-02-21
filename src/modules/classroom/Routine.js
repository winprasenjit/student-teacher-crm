import React, { useEffect, useState } from 'react';
import InputSelect from "../_shared/components/InputSelect";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import { useDispatch, useSelector } from 'react-redux';
import actionCreator from "../_shared/helpers/actionCreator";
import action from "../classes/redux/actions/classActions";
import batchActions from "../batch/redux/actions/batchActions";

const fetchData = (dispatch) => {
  dispatch(actionCreator(action.LOAD_ALL_CLASSES));
  dispatch(actionCreator(batchActions.LOAD_ALL_BATCHES));
};

const Routine = () => {
  /* To fetch class data*/
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classReducer);
  const [className, setClassName] = useState([]);
  
  const { batches } = useSelector((state) => state.batchReducer);
  const [batchName, setBatchName] = useState([]);


  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => {
    const classList = classes.map((item) => ({
      ...item,  ...{id: item._id }
    }));
    setClassName(classList);
  }, [classes]);

  useEffect(() => {
    const batchList = batches.map((item) => ({
      ...item,  ...{id: item._id }
    }));
    setBatchName(batchList);
  }, [batches]);

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
                  <InputSelect name="batchName" label="Batch Name" options={batchName}></InputSelect>
                </div>
                <div className="input-style-1 d-inline-block mx-4">
                  <InputSelect name="className" label="ClassRoom Name" options={className}></InputSelect> 
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
