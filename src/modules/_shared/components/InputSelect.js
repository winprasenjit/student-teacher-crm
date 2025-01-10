import React from "react";
import {useField} from "formik";

export default function InputSelect({label, options, ...props}) {
  const [field, meta] = useField(props);
  return (
    <div class="select-style-1">
      <label>{label}</label>
      <div class="select-position">
        <select
          className={
            'form-control ' +
            (meta.touched
              ? meta.error
                ? 'is-invalid'
                : 'is-valid'
              : '')
          }
          {...field}
          {...props}>
          <option value="">Select {label}</option>
          {(options || []).map((option) => (
            <option key={option.id} value={option.value|| option._id}>{option.name}</option>
          ))}
        </select>
        {meta.touched && meta.error ? (
          <div className='invalid-feedback'>{meta.error}</div>
        ) : null}
      </div>
    </div>
  )
}
