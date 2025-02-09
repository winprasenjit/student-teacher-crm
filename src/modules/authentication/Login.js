import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputText from "../_shared/components/InputText";
import InputCheckbox from "../_shared/components/InputCheckbox";
import actionCreator from '../_shared/helpers/actionCreator';
import "../../css/login.css";
import loginActions from './redux/actions/loginAction';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, errorMessage } = useSelector(state => state.userReducer);

  const [loginError, setLoginError] = useState("");
  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (!user && !errorMessage) return;
    if (user && !errorMessage) {
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      setLoginError(errorMessage);
      setError(true);
    }
  }, [user, errorMessage])


  function login(user) {
    dispatch(actionCreator(loginActions.LOGIN_DO, user));
  }

  const handleOnChange = (event) => {
    setError(false);
  };

  return (
    <div className="d-lg-flex half">
      <div
        className="bg order-1 order-md-2"
        style={{ backgroundImage: `url("images/bg_1.jpg")` }}
      ></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>
                Login to <strong>Student-Master</strong>
              </h3>
              <p className="mb-4"> All in one solution </p>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  acceptedTerms: false, // added for our checkbox
                }}
                validationSchema={Yup.object({
                  username: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  password: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),

                  rememberMe: Yup.boolean(),
                })}
                onSubmit={(user, { setSubmitting }) => {
                  login(user);
                }}
              >
                <Form onChange={handleOnChange}>
                  <div className="form-group mb-3">
                    <InputText
                      label="Username"
                      name="username"
                      type="text"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <InputText
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="********"
                    />
                  </div>

                  <div className="mb-4 form-check">
                    <InputCheckbox name="rememberMe">Remember me</InputCheckbox>
                    <label
                      className="form-check-label float-end"
                      htmlFor="exampleCheck1"
                    >
                      <Link to="/registration" className="forgot-pass">
                        Forgot Password
                      </Link>
                    </label>
                  </div>
                  {hasError && (
                    <div className="alert alert-danger" role="alert">
                      {loginError}
                    </div>
                  )}
                  <input
                    type="submit"
                    value="Log In"
                    className="btn btn-block btn-primary btn-login"
                  />
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
