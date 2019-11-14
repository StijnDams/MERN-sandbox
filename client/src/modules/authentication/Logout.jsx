import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "../../store/actions/userActions";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logoutUser());

  localStorage.removeItem("authToken");
  return <Redirect to="/home" />;
};

export default Logout;
