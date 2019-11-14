import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./NavBar.scss";

const NavBar = () => {
  const user = useSelector(state => state.user).user;

  return (
    <nav>
      <div className="nav-items__left">
        <Link to="/" className="home-icon">
          <i className="material-icons">home</i>
        </Link>
      </div>

      {user && (
        <>
          <div className="nav-items">
            <Link to="/todo">Todo</Link>
            <Link to="/chat">Chat</Link>
          </div>

          <div className="nav-items__right">
            <Link to="/logout">Log out</Link>
          </div>
        </>
      )}

      {!user && (
        <div className="nav-items__right">
          <Link to="/login">Log in</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
