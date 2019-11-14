import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { titleCase } from "../../utils/stringUtils";

import "./Home.scss";

const Home = () => {
  const user = useSelector(state => state.user).user;

  return (
    <div className="content-container home-greeting">
      {user ? (
        <h1>Welcome {titleCase(user.username)}.</h1>
      ) : (
        <h1>
          Welcome stranger, please{" "}
          <Link to="/login" className="action-link">
            log in
          </Link>
          .
        </h1>
      )}
    </div>
  );
};

export default Home;
