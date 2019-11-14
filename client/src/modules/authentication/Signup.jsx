import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register as registerUser } from "../../api/users/userApi";
import { loginUser } from "../../store/actions/userActions";

import "./authForm.scss";

const Login = () => {
  const user = useSelector(state => state.user).user;
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: ""
  });

  if (user) {
    return <Redirect to="/home" />;
  }

  const handleChange = e => {
    const { target } = e;
    const { value, name } = target;

    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setFormFields({
      username: "",
      email: "",
      password: ""
    });

    const result = await registerUser(
      formFields.username,
      formFields.email,
      formFields.password
    );

    handleErrors(result.errors);

    if (!errors.length > 0) {
      localStorage.setItem("authToken", result.token);
      dispatch(loginUser(result.user));
      return <Redirect to="/home" />;
    }
  };

  function handleErrors(errs) {
    if (errs) {
      const tmp = {};

      errs.forEach(err => {
        tmp[err.param ? err.param : "credentials"] = err.msg;
      });

      setErrors(tmp);
    }
  }

  return (
    <div className="content-container">
      <div className="signup-form-container">
        <h1>Sign up now!</h1>

        {errors.credentials && <div>{errors.credentials}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="username">Username</label>
            {errors.username && <div>{errors.username}</div>}
            <input
              type="text"
              name="username"
              className="input-text"
              placeholder="Your username"
              value={formFields.username}
              onChange={e => handleChange(e)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="email">Email</label>
            {errors.email && <div>{errors.email}</div>}
            <input
              type="text"
              name="email"
              className="input-text"
              placeholder="Your email"
              value={formFields.email}
              onChange={e => handleChange(e)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="password">Password</label>
            {errors.password && <div>{errors.password}</div>}
            <input
              type="password"
              name="password"
              className="input-text"
              placeholder="Password"
              value={formFields.password}
              onChange={e => handleChange(e)}
            />
          </div>

          <div className="form-submit">
            <button type="submit" className="btn">
              Sign up
            </button>
          </div>

          <hr />

          <div className="form-link">
            <p>Already have an account?</p>
            <Link to="/login">Sign in.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
