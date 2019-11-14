import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../store/actions/userActions";
import { authenticate } from "../../api/users/userApi";

import "./authForm.scss";

const Login = () => {
  const user = useSelector(state => state.user).user;
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  if (user) {
    return <Redirect to="/home" />;
  }

  function handleChange(e) {
    const { target } = e;
    const { value, name } = target;

    setFormFields({
      ...formFields,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setFormFields({
      email: "",
      password: ""
    });

    const result = await authenticate(formFields.email, formFields.password);

    handleErrors(result.errors);

    if (!errors.length > 0) {
      localStorage.setItem("authToken", result.token);
      dispatch(loginUser(result.user));
      return <Redirect to="/home" />;
    }
  }

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
        <h1>Log in</h1>

        {errors.credentials && <div>{errors.credentials}</div>}

        <form onSubmit={handleSubmit}>
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
            {errors.email && <div>{errors.password}</div>}
            <input
              type="password"
              name="password"
              className="input-text"
              placeholder="Your password"
              value={formFields.password}
              onChange={e => handleChange(e)}
            />
          </div>

          <div className="form-submit">
            <button type="submit" className="btn">
              Log in
            </button>
          </div>

          <hr />

          <div className="form-link">
            <p>Haven&rsquo;t created an account yet?</p>
            <Link to="/signup">Sign up.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
