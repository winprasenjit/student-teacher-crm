import InputSelect from "../_shared/components/InputSelect";
import React, {useState} from "react";
import Select from "react-select";

const weekDays = [
  {value: 'Sunday', label: 'Sunday'},
  {value: 'Monday', label: 'Monday'},
  {value: 'Tuesday', label: 'Tuesday'},
  {value: 'Wednesday', label: 'Wednesday'},
  {value: 'Thursday', label: 'Thursday'},
  {value: 'Friday', label: 'Friday'},
  {value: 'Saturday', label: 'Saturday'}
];

const RoutineForm = ({index, batchName = [], className = [], setFieldValue, arrayHelpers, initialValues}) => {
  return (<div className="row">
    <div className="col-12">
      <div className="input-style-1 d-inline-block mx-4">
        <InputSelect name={`forms.${index}.batchName`} label="Batch Name" options={batchName}></InputSelect>
      </div>
      <div className="input-style-1 d-inline-block mx-4">
        <InputSelect name={`forms.${index}.className`} label="ClassRoom Name" options={className}></InputSelect>
      </div>
      <div className="input-style-1 d-inline-block mx-4">
        <label>Week Days</label>
        <Select
          name={`forms.${index}.weekDays`}
          options={weekDays}
          isMulti
          onChange={(selectedOptions) => {
            setFieldValue(`forms.${index}.weekDays`, selectedOptions.map(option => option.value));
          }}
        ></Select>
      </div>
      <div className="input-style-1 d-inline-block mx-4">
        <label>Time</label>
        <input type="time" name={`forms.${index}.time`} onChange={(event) => setFieldValue(`forms.${index}.time`, event.target.value)}/>
      </div>
      {false && (
        <>
          <div className="input-style-1 d-inline-block mx-4">
            <label>Or</label>
          </div>
          <div className="input-style-1 d-inline-block mx-4">
            <label>Date</label>
            <input type="date" name={`forms.${index}.date`} onChange={(event) => setFieldValue(`forms.${index}.date`, event.target.value)}/>
          </div>
        </>)}
      <i className="lni lni-circle-plus mr-5" onClick={() => arrayHelpers.insert(index + 1, initialValues)}></i>
      {(index > 0 && <i className="lni lni-trash-can" onClick={() => arrayHelpers.remove(index)}></i>)}
    </div>
  </div>)
};

export default RoutineForm;


