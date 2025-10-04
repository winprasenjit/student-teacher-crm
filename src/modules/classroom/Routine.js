import React, {useEffect, useState} from 'react';
import {FieldArray, Form, Formik} from "formik";
import {useDispatch, useSelector} from 'react-redux';
import actionCreator from "../_shared/helpers/actionCreator";
import action from "../classes/redux/actions/classActions";
import batchActions from "../batch/redux/actions/batchActions";
import RoutineForm from "./RoutineForm";

const fetchData = (dispatch) => {
  dispatch(actionCreator(action.LOAD_ALL_CLASSES));
  dispatch(actionCreator(batchActions.LOAD_ALL_BATCHES));
};

const Routine = () => {
  const initialValues = {
    batchName: '',
    className: '',
    weekDays: '',
    time: '',
    date: ''
  };
  /* To fetch class data*/
  const dispatch = useDispatch();
  const {classes} = useSelector((state) => state.classReducer);
  const [className, setClassName] = useState([]);
  const {batches} = useSelector((state) => state.batchReducer);
  const [batchName, setBatchName] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [allSelectedBatches, setAllSelectedBatches] = useState([]);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  useEffect(() => {
    const classList = classes.map((item) => ({
      ...item, ...{id: item._id}
    }));
    setClassName(classList);
  }, [classes]);

  useEffect(() => {
    const batchList = batches.map((item) => ({
      ...item, ...{id: item._id}
    }));
    setBatchName(batchList);
  }, [batches]);

  const handleOnChange = (event, values) => {
    const fieldName = ((event.target.name||'').split('.')||[]).at(-1);
    if(fieldName === 'batchName'){
      const selectedBatchId = event.target.value;
      setSelectedBatch(selectedBatchId);
      const selectedBatchData = batchName.find(batch => batch._id === selectedBatchId);
      if (selectedBatchData) {
        setAllSelectedBatches([...allSelectedBatches, selectedBatchData._id]);
      }
    }
  };

  return (
    <div className="card-style mt-30">
      <div className="row">
        <div className="col-12">
          <Formik
            initialValues={{
              forms: [initialValues]
            }}
            onSubmit={({forms: values}) => {
              console.log(values);
            }}
          >
            {({values, setFieldValue}) => (
              <Form onChange={(event) => handleOnChange(event, values)}>
                <FieldArray
                  name="forms"
                  render={arrayHelpers => (
                    <div className="mb-30">
                      <h6 className="mb-25">Set Routine</h6>
                      {values.forms.map((item, index) => {
                        const allAvailableBatches = batchName.filter((batch) => !allSelectedBatches.includes(batch._id) 
                          || (batch._id === item.batchName));
                        return (
                          <React.Fragment key={index}>
                            <RoutineForm
                              index={index}
                              batchName={allAvailableBatches}
                              className={className}
                              initialValues={initialValues}
                              arrayHelpers={arrayHelpers}
                              setFieldValue={setFieldValue}/>
                          </React.Fragment>
                        )
                      })}
                    </div>
                  )}
                />
                <div className="float-end">
                  <button
                    className="btn btn-block btn-primary"
                    type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Routine;
