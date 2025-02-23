import { useField } from 'formik';
import React from 'react';

export default function InputRadio({ children, ...props }) {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'radio' });
  return (
    <div
      className={
        'form-check radio-style mb-20 mr-20 ' + ('radio_class_' + props.id)
      }
      style={{ display: 'inline-block' }}
    >
      <input
        className={
          'form-check-input ' +
          (meta.touched ? (meta.error ? 'is-invalid' : 'is-valid') : '')
        }
        type="radio"
        id={props.id || props.name}
        {...field}
        {...props}
      />

      <label className="form-check-label" htmlFor={props.id || props.name}>
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
}
