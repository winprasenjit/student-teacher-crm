import { useField } from 'formik';
import React from 'react';

export default function InputText({ label, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className='form-label'>
        {label}
      </label>
      <input
        type='text'
        className={
          'form-control ' +
          (meta.touched
            ? meta.error
              ? 'is-invalid'
              : 'is-valid'
            : '')
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='invalid-feedback'>{meta.error}</div>
      ) : null}
    </>
  );
}
